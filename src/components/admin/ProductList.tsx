import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Loader2, Trash2, Eye, EyeOff, Star, StarOff, ExternalLink } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: string;
  category: string | null;
  is_affiliate: boolean;
  is_featured: boolean;
  is_active: boolean;
  image_url: string | null;
  affiliate_url: string | null;
}

const ProductList = () => {
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      // Note: La table "products" sera créée via migration
      const { data, error } = await (supabase as any)
        .from("products")
        .select("id, title, price, category, is_affiliate, is_featured, is_active, image_url, affiliate_url")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any)
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé de la boutique.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["boutique-products"] });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de supprimer le produit",
        variant: "destructive",
      });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await (supabase as any)
        .from("products")
        .update({ is_active: !is_active })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Statut modifié",
        description: "La visibilité du produit a été modifiée.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["boutique-products"] });
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, is_featured }: { id: string; is_featured: boolean }) => {
      const { error } = await (supabase as any)
        .from("products")
        .update({ is_featured: !is_featured })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Mise en avant modifiée",
        description: "Le statut de mise en avant a été modifié.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["boutique-products"] });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produits existants</CardTitle>
        <CardDescription>Liste de tous les produits de la boutique</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {products?.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-4 border rounded-lg"
              >
                {product.image_url && (
                  <img 
                    src={product.image_url} 
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-medium truncate">{product.title}</h3>
                    {product.is_affiliate && (
                      <Badge variant="secondary" className="text-xs">
                        Affiliation
                      </Badge>
                    )}
                    {product.is_featured && (
                      <Badge className="text-xs bg-yellow-500">
                        En avant
                      </Badge>
                    )}
                    {!product.is_active && (
                      <Badge variant="outline" className="text-xs">
                        Inactif
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{product.price}</span>
                    {product.category && (
                      <>
                        <span>•</span>
                        <span className="capitalize">{product.category}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  {product.is_affiliate && product.affiliate_url && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(product.affiliate_url!, '_blank')}
                      title="Voir le lien d'affiliation"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFeaturedMutation.mutate({ id: product.id, is_featured: product.is_featured })}
                    disabled={toggleFeaturedMutation.isPending}
                    title={product.is_featured ? "Retirer de la mise en avant" : "Mettre en avant"}
                  >
                    {product.is_featured ? (
                      <StarOff className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleActiveMutation.mutate({ id: product.id, is_active: product.is_active })}
                    disabled={toggleActiveMutation.isPending}
                    title={product.is_active ? "Désactiver" : "Activer"}
                  >
                    {product.is_active ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteMutation.mutate(product.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {products?.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Aucun produit pour le moment
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductList;