import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShoppingBag, Package, CreditCard, Truck, ExternalLink, Star, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  title: string;
  description: string;
  short_description: string | null;
  price: string;
  original_price: string | null;
  image_url: string | null;
  category: string | null;
  is_affiliate: boolean;
  affiliate_url: string | null;
  is_featured: boolean;
}

const Boutique = () => {
  useEffect(() => {
    document.title = "Boutique - OREDY Technologies";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez notre boutique en ligne avec une sélection de produits et services technologiques de qualité.');
    }
  }, []);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["boutique-products"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        return [];
      }
      return data as Product[];
    },
  });

  const features = [
    { icon: Package, title: "Livraison Rapide", description: "Projets livrés dans les délais" },
    { icon: CreditCard, title: "Paiement Sécurisé", description: "Transactions sécurisées" },
    { icon: Truck, title: "Support 24/7", description: "Assistance technique continue" },
    { icon: ShoppingBag, title: "Satisfaction Garantie", description: "100% de satisfaction client" }
  ];

  const handleProductClick = (product: Product) => {
    if (product.is_affiliate && product.affiliate_url) {
      window.open(product.affiliate_url, '_blank');
    }
  };

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
            <h2 className="section-title text-center mb-12">Nos Produits & Services</h2>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-turquoise" />
              </div>
            ) : error || !products || products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Aucun produit disponible pour le moment.</p>
                <p className="text-gray-500 mt-2">Revenez bientôt pour découvrir nos offres !</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="card group hover:border-turquoise/50 transition-all duration-300 relative"
                  >
                    {product.is_featured && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <Badge className="bg-yellow-500 text-black">
                          <Star className="w-3 h-3 mr-1" />
                          Populaire
                        </Badge>
                      </div>
                    )}
                    
                    <div className="aspect-square bg-gray-800 rounded-lg mb-4 overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-16 h-16 text-gray-600" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold line-clamp-2">{product.title}</h3>
                      {product.is_affiliate && (
                        <Badge variant="secondary" className="text-xs shrink-0">
                          Partenaire
                        </Badge>
                      )}
                    </div>
                    
                    {product.category && (
                      <Badge variant="outline" className="text-xs mb-2 capitalize">
                        {product.category}
                      </Badge>
                    )}
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.short_description || product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-turquoise font-bold text-lg">{product.price}</span>
                        {product.original_price && (
                          <span className="text-gray-500 line-through text-sm">{product.original_price}</span>
                        )}
                      </div>
                      
                      {product.is_affiliate && product.affiliate_url ? (
                        <Button 
                          onClick={() => handleProductClick(product)}
                          className="btn-primary flex items-center gap-1"
                        >
                          Voir
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Link to="/contact">
                          <Button className="btn-primary">
                            Commander
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
              <Link to="/contact">
                <Button className="btn-primary">
                  Demander un devis
                </Button>
              </Link>
              <Link to="/portfolio/wordpress">
                <Button variant="outline" className="btn-outline">
                  Voir le portfolio
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Boutique;