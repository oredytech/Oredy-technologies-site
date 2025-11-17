import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const purchaseId = searchParams.get("purchase_id");

  useEffect(() => {
    // Vous pouvez ajouter ici une logique pour vérifier le statut du paiement
    console.log("Payment successful for purchase:", purchaseId);
  }, [purchaseId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Paiement réussi !</CardTitle>
            <CardDescription>
              Votre paiement a été effectué avec succès
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-green-800 dark:text-green-200 text-sm">
                Nous avons bien reçu votre paiement. Vous recevrez un email de confirmation avec tous les détails de votre achat dans les prochaines minutes.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-sm">Prochaines étapes :</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-2">
                <li>Vous recevrez un email de confirmation</li>
                <li>Notre équipe préparera les fichiers de votre site</li>
                <li>Vous recevrez les fichiers et les instructions d'installation sous 24h</li>
              </ol>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={() => navigate("/marketplace")} className="flex-1">
                Retour au marché
              </Button>
              <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
                Accueil
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
