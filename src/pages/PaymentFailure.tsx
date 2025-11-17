import { useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const purchaseId = searchParams.get("purchase_id");

  useEffect(() => {
    console.log("Payment failed for purchase:", purchaseId);
  }, [purchaseId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl">Paiement échoué</CardTitle>
            <CardDescription>
              Votre paiement n'a pas pu être traité
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200 text-sm">
                Le paiement n'a pas été effectué. Aucun montant n'a été débité de votre compte.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-sm">Que faire maintenant ?</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                <li>Vérifiez que vous avez suffisamment de fonds</li>
                <li>Assurez-vous que votre numéro Mobile Money est correct</li>
                <li>Contactez votre opérateur si le problème persiste</li>
              </ul>
            </div>

            <div className="flex gap-2 pt-4">
              {purchaseId && (
                <Button asChild className="flex-1">
                  <Link to={`/marketplace/purchase/${purchaseId.split('?')[0]}`}>
                    Réessayer
                  </Link>
                </Button>
              )}
              <Button onClick={() => navigate("/marketplace")} variant="outline" className="flex-1">
                Retour au marché
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentFailure;
