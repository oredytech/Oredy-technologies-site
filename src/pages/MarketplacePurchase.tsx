import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCommerceSite, submitCommercePurchase } from "@/lib/wordpressCommerce";
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
  const queryClient = useQueryClient();
  const [reference, setReference] = useState('');
  const [formData, setFormData] = useState({
    buyer_name: "",
    buyer_email: "",
    buyer_phone: "",
  });

  const { data: site, isLoading, error } = useQuery({
    queryKey: ["wordpress-commerce-site", id], queryFn: () => fetchCommerceSite(id || ''), enabled: Boolean(id),
  });
  const purchaseMutation = useMutation({
    mutationFn: async (data: { buyer_name: string; buyer_email: string; buyer_phone: string }) => {
      if (!id) throw new Error('Site non trouvé.');
      return submitCommercePurchase(id, purchaseSchema.parse(data));
    },
    onSuccess: (data) => {
      setReference(data.reference);
      queryClient.invalidateQueries({ queryKey: ["wordpress-commerce-sites"] });
      queryClient.invalidateQueries({ queryKey: ["wordpress-commerce-site", id] });
    },
    onError: (error) => toast({ title: 'Demande non enregistrée', description: error instanceof Error ? error.message : 'Veuillez réessayer.', variant: 'destructive' }),
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

  if (reference) {
    return <div className="min-h-screen flex flex-col"><Header />
      <main className="container pt-24 pb-12 flex-1 space-y-5">
        <h1 className="text-3xl font-display">Demande d’achat enregistrée</h1>
        <p>Référence : <strong>{reference}</strong></p>
        <p>Votre site reste visible avec le statut « En cours d’achat ».</p>
        <h2 className="text-xl font-semibold">Paiement Mobile Money</h2>
        <p>Airtel Money : +243 996886079 — Orange Money : +243 851006476</p>
        <p>Bénéficiaire : MUSANDA FABRICE / OREDY MUSANDA</p>
        <p>Envoyez la preuve de paiement et votre référence à <a className="text-primary underline" href="mailto:oredymusanda@gmail.com">oredymusanda@gmail.com</a>. La vente sera confirmée après vérification.</p>
        <Button asChild><Link to="/marketplace">Retour au marché</Link></Button>
      </main><Footer /></div>;
  }

  if (!site || site.status !== "available") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{error ? "Impossible de charger ce site" : "Site non disponible"}</h1>
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
      <main className="flex-1 container mx-auto pt-24 pb-12">
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
                    <span className="text-2xl font-bold text-primary">{site.price} {site.currency}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vos informations</CardTitle>
                <CardDescription>
                  Entrez vos informations pour demander l’achat de ce site
                </CardDescription>
              </CardHeader>
              <CardContent>
                {site.purchase_url ? (
                  <Button asChild className="w-full"><a href={site.purchase_url} target="_blank" rel="noopener noreferrer">Procéder au paiement <ArrowLeft className="rotate-180" /></a></Button>
                ) : <form onSubmit={handleSubmit} className="space-y-4">
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
                        Enregistrement...
                      </>
                    ) : (
                      "Confirmer la demande d’achat"
                    )}
                  </Button>
                </form>}
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
