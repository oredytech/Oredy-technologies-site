import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Conditions d'Utilisation</h1>
              <p className="text-muted-foreground">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptation des Conditions</h2>
              <p className="text-muted-foreground leading-relaxed">
                En accédant et en utilisant les services d'OREDY TECHNOLOGIES, vous acceptez d'être lié par ces conditions d'utilisation. 
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description des Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                OREDY TECHNOLOGIES propose des services de développement web, de conception graphique, 
                de marketing digital et de formation. Nos services sont fournis conformément aux spécifications 
                convenues avec chaque client.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Obligations de l'Utilisateur</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                En utilisant nos services, vous vous engagez à :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Fournir des informations exactes et à jour</li>
                <li>Respecter toutes les lois et réglementations applicables</li>
                <li>Ne pas utiliser nos services à des fins illégales ou non autorisées</li>
                <li>Ne pas tenter d'interférer avec le bon fonctionnement de nos services</li>
                <li>Protéger la confidentialité de vos identifiants de connexion</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Propriété Intellectuelle</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tous les contenus, designs, logos et marques présents sur nos plateformes sont la propriété 
                d'OREDY TECHNOLOGIES ou de ses partenaires. Toute reproduction ou utilisation non autorisée 
                est strictement interdite. Les droits de propriété intellectuelle des projets réalisés pour les clients 
                sont définis dans les contrats spécifiques.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Limitation de Responsabilité</h2>
              <p className="text-muted-foreground leading-relaxed">
                OREDY TECHNOLOGIES s'efforce de fournir des services de qualité, mais ne peut garantir 
                l'absence d'erreurs ou d'interruptions. Nous ne sommes pas responsables des dommages indirects, 
                accessoires ou consécutifs résultant de l'utilisation de nos services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Tarifs et Paiements</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Les tarifs de nos services sont communiqués lors de la soumission de devis. Nous nous réservons le droit de :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Modifier nos tarifs à tout moment</li>
                <li>Suspendre les services en cas de non-paiement</li>
                <li>Appliquer des pénalités de retard selon les conditions contractuelles</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Résiliation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous nous réservons le droit de suspendre ou de résilier l'accès à nos services en cas de violation 
                de ces conditions d'utilisation. Les clients peuvent également résilier nos services conformément 
                aux conditions contractuelles convenues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Modifications des Conditions</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous nous réservons le droit de modifier ces conditions à tout moment. 
                Les modifications entreront en vigueur dès leur publication sur notre site. 
                Votre utilisation continue de nos services après la publication des modifications 
                constitue votre acceptation des nouvelles conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Loi Applicable</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ces conditions sont régies par les lois en vigueur en République Démocratique du Congo. 
                Tout litige sera soumis à la juridiction exclusive des tribunaux compétents de Goma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pour toute question concernant ces conditions d'utilisation, 
                contactez-nous à : <span className="text-primary font-medium">contact@oredytech.com</span> 
                ou par téléphone au <span className="text-primary font-medium">+243 851 006 476</span>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;