import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  buyer_phone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 caractères").max(20),
});

const MarketplacePurchase = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    buyer_name: "",
    buyer_email: "",
    buyer_phone: "",
  });
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

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
    mutationFn: async (data: { buyer_name: string; buyer_email: string; buyer_phone: string }) => {
      const validated = purchaseSchema.parse(data);
      
      // Insérer la demande d'achat
      const { error: insertError } = await supabase.from("site_purchases").insert({
        site_id: id,
        buyer_name: validated.buyer_name,
        buyer_email: validated.buyer_email,
        buyer_phone: validated.buyer_phone,
      });

      if (insertError) throw insertError;

      // Mettre à jour le statut du site à "pending"
      const { error: updateError } = await supabase
        .from("marketplace_sites")
        .update({ status: "pending" })
        .eq("id", id);

      if (updateError) throw updateError;

      // Envoyer les notifications par email
      const { error: emailError } = await supabase.functions.invoke("send-purchase-notification", {
        body: {
          siteTitle: site?.title,
          buyerName: validated.buyer_name,
          buyerEmail: validated.buyer_email,
          buyerPhone: validated.buyer_phone,
          siteId: id,
        },
      });

      if (emailError) {
        console.error("Error sending emails:", emailError);
      }
    },
    onSuccess: () => {
      setShowPaymentInfo(true);
      toast({
        title: "Demande envoyée",
        description: "Consultez les instructions de paiement ci-dessous.",
      });
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

  if (!site || (site.status !== "available" && !showPaymentInfo)) {
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
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link to={`/marketplace/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux détails
            </Link>
          </Button>

          <div className="grid gap-6">
            {!showPaymentInfo && (
              <>
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
                      Entrez vos informations pour recevoir les détails de paiement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="buyer_name">Nom complet *</Label>
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
                        <Label htmlFor="buyer_email">Email *</Label>
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

                      <div className="space-y-2">
                        <Label htmlFor="buyer_phone">Numéro de téléphone *</Label>
                        <Input
                          id="buyer_phone"
                          type="tel"
                          value={formData.buyer_phone}
                          onChange={(e) =>
                            setFormData({ ...formData, buyer_phone: e.target.value })
                          }
                          required
                          maxLength={20}
                          placeholder="+243 XXX XXX XXX"
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
                            Traitement en cours...
                          </>
                        ) : (
                          "Confirmer l'achat"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </>
            )}

            {showPaymentInfo && (
              <Card>
                <CardHeader>
                  <CardTitle>Instructions de paiement</CardTitle>
                  <CardDescription>
                    Suivez ces instructions pour finaliser votre achat
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-green-900 dark:text-green-100">
                      ✅ Demande d'achat confirmée !
                    </h3>
                    <p className="text-green-800 dark:text-green-200 mb-4">
                      Votre demande d'achat pour <strong>{site?.title}</strong> a été enregistrée avec succès.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Modalités de paiement</h3>
                    
                    <div className="bg-muted p-4 rounded-lg space-y-3">
                      <p className="font-medium">Montant à payer : <span className="text-2xl text-primary">{site?.price} €</span></p>
                      
                      <div className="space-y-2">
                        <p className="font-medium">Envoyez l'argent via :</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li><strong>Airtel Money :</strong> +243 996886079</li>
                          <li><strong>Orange Money :</strong> +243 851006476</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded p-3 mt-4">
                        <p className="text-yellow-900 dark:text-yellow-100 font-medium mb-2">
                          ⚠️ Important :
                        </p>
                        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                          Le nom qui apparaîtra lors de l'envoi sera : <strong>MUSANDA FABRICE</strong> et/ou <strong>OREDY MUSANDA</strong>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <h4 className="font-medium">Après le paiement :</h4>
                      <ol className="list-decimal list-inside space-y-2 ml-2">
                        <li>Prenez une capture d'écran du message de confirmation d'envoi d'argent</li>
                        <li>Envoyez cette preuve de paiement par email à l'adresse indiquée dans l'email que vous avez reçu</li>
                        <li>Nous vérifierons le paiement et vous enverrons les fichiers du site sous 24h</li>
                      </ol>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-4 mt-4">
                      <p className="text-blue-900 dark:text-blue-100 text-sm">
                        📧 Nous avons bien reçu votre demande. Nous vous contacterons par email (<strong>{formData.buyer_email}</strong>) et par téléphone (<strong>{formData.buyer_phone}</strong>) pour finaliser l'achat.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button asChild className="w-full" size="lg">
                      <Link to="/marketplace">
                        Retour au marché
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MarketplacePurchase;