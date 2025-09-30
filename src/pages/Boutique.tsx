import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShoppingBag, Package, CreditCard, Truck } from 'lucide-react';

const Boutique = () => {
  useEffect(() => {
    document.title = "Boutique - OREDY Technologies";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez notre boutique en ligne avec une sélection de produits et services technologiques de qualité.');
    }
  }, []);

  const products = [
    {
      id: 1,
      name: "Service de Développement Web",
      price: "À partir de 500€",
      image: "/lovable-uploads/3bfe6d5c-b718-43a3-b6c3-160a00e01a9b.png",
      description: "Création de sites web modernes et responsives sur mesure"
    },
    {
      id: 2,
      name: "Application Mobile",
      price: "À partir de 1500€",
      image: "/lovable-uploads/44ac66f7-c374-4e1d-aef0-fc263b369f8d.png",
      description: "Développement d'applications mobiles iOS et Android"
    },
    {
      id: 3,
      name: "Consultation IT",
      price: "75€/heure",
      image: "/lovable-uploads/6a9984fe-a9bb-4fe7-8b59-8222fd6c6332.png",
      description: "Consultation personnalisée pour vos projets technologiques"
    },
    {
      id: 4,
      name: "Formation Tech",
      price: "250€",
      image: "/lovable-uploads/7c4231fc-4528-4ab5-a4ae-283376f13464.png",
      description: "Formation en développement web et nouvelles technologies"
    }
  ];

  const features = [
    { icon: Package, title: "Livraison Rapide", description: "Projets livrés dans les délais" },
    { icon: CreditCard, title: "Paiement Sécurisé", description: "Transactions sécurisées" },
    { icon: Truck, title: "Support 24/7", description: "Assistance technique continue" },
    { icon: ShoppingBag, title: "Satisfaction Garantie", description: "100% de satisfaction client" }
  ];

  return (
    <div className="min-h-screen bg-darkGray text-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Notre <span className="turquoise-text">Boutique</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Découvrez nos services et solutions technologiques pour faire évoluer votre entreprise
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section bg-gray-900/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-turquoise/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-turquoise" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section">
          <div className="container">
            <h2 className="section-title text-center mb-12">Nos Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="card group hover:border-turquoise/50 transition-all duration-300">
                  <div className="aspect-square bg-gray-800 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-turquoise font-bold text-lg">{product.price}</span>
                    <button className="btn-primary">
                      Commander
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section bg-gray-900/50">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à commencer votre projet ?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Demander un devis
              </button>
              <button className="btn-outline">
                Voir le portfolio
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Boutique;