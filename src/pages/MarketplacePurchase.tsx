import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const purchaseSchema = z.object({
  buyer_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  buyer_email: z.string().email("Email invalide").max(255),
});

const MarketplacePurchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    buyer_name: "",
    buyer_email: "",
  });

  const { data: site, isLoading } = useQuery({
    queryKey: ["marketplace-site", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marketplace_sites")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const purchaseMutation = useMutation({
    mutationFn: async (data: { buyer_name: string; buyer_email: string }) => {
      const validated = purchaseSchema.parse(data);
      
      const { error } = await supabase.from("site_purchases").insert({
        site_id: id,
        buyer_name: validated.buyer_name,
        buyer_email: validated.buyer_email,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Demande d'achat envoyée",
        description: "Nous vous contactons bientôt avec les détails de paiement.",
      });
      navigate("/marketplace");
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    purchaseMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!site || site.status !== "available") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Site non disponible</h1>
            <Button asChild>
              <Link to="/marketplace">Retour au marché</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link to={`/marketplace/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux détails
            </Link>
          </Button>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif de votre achat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Site web:</span>
                    <span className="font-medium">{site.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prix:</span>
                    <span className="text-2xl font-bold text-primary">{site.price} €</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vos informations</CardTitle>
                <CardDescription>
                  Nous vous contacterons pour finaliser l'achat et le paiement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="buyer_name">Nom complet</Label>
                    <Input
                      id="buyer_name"
                      value={formData.buyer_name}
                      onChange={(e) =>
                        setFormData({ ...formData, buyer_name: e.target.value })
                      }
                      required
                      maxLength={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buyer_email">Email</Label>
                    <Input
                      id="buyer_email"
                      type="email"
                      value={formData.buyer_email}
                      onChange={(e) =>
                        setFormData({ ...formData, buyer_email: e.target.value })
                      }
                      required
                      maxLength={255}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={purchaseMutation.isPending}
                  >
                    {purchaseMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Confirmer la demande d'achat"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MarketplacePurchase;
