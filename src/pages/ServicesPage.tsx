import { Monitor, Smartphone, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  linkText,
  linkUrl 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  linkText: string,
  linkUrl: string 
}) => {
  return (
    <div className="service-card group">
      <div className="mb-6 flex justify-center">
        <div className="w-16 h-16 rounded-md bg-darkGray flex items-center justify-center text-turquoise group-hover:scale-110 transition-transform duration-300">
          <Icon size={32} />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-300 mb-6">{description}</p>
      <Link to={linkUrl} className="text-turquoise hover:underline inline-block">{linkText}</Link>
    </div>
  );
};

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-darkGray text-white">
      <Header />
      
      <main className="pt-20">
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Mes <span className="text-turquoise">Services</span>
              </h1>
              <h3 className="text-xl text-gray-400 mb-6">Ce que je fais</h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Découvrez la gamme complète de mes services numériques conçus pour transformer 
                vos idées en réalité digitale et propulser votre entreprise vers le succès.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard 
                icon={Monitor}
                title="Web Design"
                description="Je suis capable de transformer vos idées en un site web pour l'image numérique de votre entreprise. Des designs modernes et responsives qui captent l'attention de vos visiteurs."
                linkText="Voir mes travaux"
                linkUrl="/portfolio/webdesign"
              />
              
              <ServiceCard 
                icon={Bookmark}
                title="WordPress"
                description="Je suis spécialisé pour structurer vos idées en un site web utilisant WordPress, pour améliorer l'image numérique de votre entreprise avec des solutions sur mesure."
                linkText="Voir mes travaux"
                linkUrl="/portfolio/wordpress"
              />
              
              <ServiceCard 
                icon={Smartphone}
                title="Développement"
                description="Propulsez l'image numérique de votre entreprise avec mon expertise pointue en développement web et mobile d'applications modernes et performantes."
                linkText="Voir mes travaux"
                linkUrl="/portfolio/development"
              />
            </div>

            {/* Section supplémentaire avec plus de détails */}
            <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Pourquoi choisir <span className="text-turquoise">OREDY</span> ?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-turquoise rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Expertise technique</h4>
                      <p className="text-gray-300">Maîtrise des dernières technologies et frameworks</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-turquoise rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Design créatif</h4>
                      <p className="text-gray-300">Interfaces modernes et expérience utilisateur optimale</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-turquoise rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Support dédié</h4>
                      <p className="text-gray-300">Accompagnement personnalisé tout au long de votre projet</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-mediumGray rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-turquoise/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Monitor size={40} className="text-turquoise" />
                    </div>
                    <h3 className="text-xl font-semibold">Projets réalisés</h3>
                    <p className="text-3xl font-bold text-turquoise mt-2">50+</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <h3 className="text-2xl font-bold mb-4">Prêt à démarrer votre projet ?</h3>
              <p className="text-gray-300 mb-8">Contactez-moi pour discuter de vos besoins et obtenir un devis personnalisé</p>
              <Link to="/contact" className="btn btn-primary">
                Commencer un projet
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;