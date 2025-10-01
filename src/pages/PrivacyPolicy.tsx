import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Politique de Confidentialité</h1>
              <p className="text-muted-foreground">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                OREDY TECHNOLOGIES s'engage à protéger la confidentialité de vos données personnelles. 
                Cette politique décrit comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez nos services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Collecte des Données</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous collectons les informations suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Informations d'identification (nom, prénom, email)</li>
                <li>Informations de contact (numéro de téléphone, adresse)</li>
                <li>Données de navigation et d'utilisation de nos services</li>
                <li>Informations techniques (adresse IP, type de navigateur)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Utilisation des Données</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Fournir et améliorer nos services</li>
                <li>Communiquer avec vous concernant nos services</li>
                <li>Personnaliser votre expérience utilisateur</li>
                <li>Assurer la sécurité de nos services</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Protection des Données</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées 
                pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Partage des Données</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous ne vendons ni ne louons vos données personnelles à des tiers. 
                Nous pouvons partager vos informations uniquement avec des prestataires de services de confiance 
                qui nous aident à exploiter notre activité, sous réserve de leur engagement à maintenir la confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Vos Droits</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Conformément à la réglementation en vigueur, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification de vos données</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                Vous pouvez configurer votre navigateur pour refuser les cookies, 
                mais cela peut affecter certaines fonctionnalités du site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, 
                contactez-nous à : <span className="text-primary font-medium">contact@oredytech.com</span>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;