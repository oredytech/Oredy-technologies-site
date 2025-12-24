import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Image, Link as LinkIcon, Tag } from "lucide-react";
import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères").max(200),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  short_description: z.string().max(300).optional(),
  price: z.string().min(1, "Le prix est requis"),
  original_price: z.string().optional(),
  image_url: z.string().url("URL d'image invalide").optional().or(z.literal("")),
  category: z.string().optional(),
  is_affiliate: z.boolean().default(false),
  affiliate_url: z.string().url("URL d'affiliation invalide").optional().or(z.literal("")),
  affiliate_commission: z.string().optional(),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
  stock_quantity: z.number().default(-1),
});

interface ProductFormData {
  title: string;
  description: string;
  short_description: string;
  price: string;
  original_price: string;
  image_url: string;
  category: string;
  is_affiliate: boolean;
  affiliate_url: string;
  affiliate_commission: string;
  is_featured: boolean;
  is_active: boolean;
  stock_quantity: string;
}

const initialFormData: ProductFormData = {
  title: "",
  description: "",
  short_description: "",
  price: "",
  original_price: "",
  image_url: "",
  category: "",
  is_affiliate: false,
  affiliate_url: "",
  affiliate_commission: "",
  is_featured: false,
  is_active: true,
  stock_quantity: "-1",
};

const ProductForm = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  const createMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const validated = productSchema.parse({
        title: data.title,
        description: data.description,
        short_description: data.short_description || undefined,
        price: data.price,
        original_price: data.original_price || undefined,
        image_url: data.image_url || undefined,
        category: data.category || undefined,
        is_affiliate: data.is_affiliate,
        affiliate_url: data.is_affiliate ? data.affiliate_url || undefined : undefined,
        affiliate_commission: data.is_affiliate ? data.affiliate_commission || undefined : undefined,
        is_featured: data.is_featured,
        is_active: data.is_active,
        stock_quantity: parseInt(data.stock_quantity) || -1,
      });

      // Note: La table "products" sera créée via migration
      const { error } = await (supabase as any).from("products").insert([{
        title: validated.title,
        description: validated.description,
        short_description: validated.short_description,
        price: validated.price,
        original_price: validated.original_price,
        image_url: validated.image_url,
        category: validated.category,
        is_affiliate: validated.is_affiliate,
        affiliate_url: validated.affiliate_url,
        affiliate_commission: validated.affiliate_commission,
        is_featured: validated.is_featured,
        is_active: validated.is_active,
        stock_quantity: validated.stock_quantity,
      }]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Produit ajouté",
        description: "Le produit a été ajouté à la boutique avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["boutique-products"] });
      setFormData(initialFormData);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible d'ajouter le produit",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Ajouter un produit
        </CardTitle>
        <CardDescription>
          Remplissez le formulaire pour ajouter un nouveau produit à la boutique
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Informations de base</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">Titre du produit *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                maxLength={200}
                placeholder="Nom du produit"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Courte description</Label>
              <Input
                id="short_description"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                maxLength={300}
                placeholder="Description courte pour les aperçus"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description complète *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                placeholder="Description détaillée du produit"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix *</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  placeholder="Ex: 99€ ou À partir de 50€"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="original_price">Prix original (si promo)</Label>
                <Input
                  id="original_price"
                  value={formData.original_price}
                  onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                  placeholder="Ex: 149€"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="formation">Formation</SelectItem>
                  <SelectItem value="ebook">E-book</SelectItem>
                  <SelectItem value="template">Template</SelectItem>
                  <SelectItem value="logiciel">Logiciel</SelectItem>
                  <SelectItem value="materiel">Matériel</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock_quantity">Quantité en stock (-1 = illimité)</Label>
              <Input
                id="stock_quantity"
                type="number"
                value={formData.stock_quantity}
                onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                placeholder="-1"
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              <Image className="h-4 w-4" />
              Image du produit
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="image_url">URL de l'image</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {formData.image_url && (
              <div className="border rounded-lg p-2">
                <img 
                  src={formData.image_url} 
                  alt="Aperçu" 
                  className="w-full max-h-48 object-contain rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
            )}
          </div>

          {/* Affiliation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Produit d'affiliation
            </h3>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="is_affiliate"
                checked={formData.is_affiliate}
                onCheckedChange={(checked) => setFormData({ ...formData, is_affiliate: checked })}
              />
              <Label htmlFor="is_affiliate">Ce produit est un produit d'affiliation</Label>
            </div>

            {formData.is_affiliate && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="affiliate_url">URL d'affiliation *</Label>
                  <Input
                    id="affiliate_url"
                    type="url"
                    value={formData.affiliate_url}
                    onChange={(e) => setFormData({ ...formData, affiliate_url: e.target.value })}
                    placeholder="https://affilié.com/lien?ref=votre-id"
                    required={formData.is_affiliate}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="affiliate_commission">Commission d'affiliation</Label>
                  <Input
                    id="affiliate_commission"
                    value={formData.affiliate_commission}
                    onChange={(e) => setFormData({ ...formData, affiliate_commission: e.target.value })}
                    placeholder="Ex: 10% ou 5€ par vente"
                  />
                </div>
              </>
            )}
          </div>

          {/* Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Options</h3>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
              />
              <Label htmlFor="is_featured">Produit mis en avant</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Produit actif (visible dans la boutique)</Label>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={createMutation.isPending}>
            {createMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Ajout en cours...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter le produit
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;