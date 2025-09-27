import { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  text: string;
  avatarUrl: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Nathanael Lusuka",
    company: "KIVU REPORTER",
    text: "Très satisfait du travail réalisé par OREDY. Le site web développé répond parfaitement à nos attentes et dépasse même nos espérances initiales.",
    avatarUrl: "/lovable-uploads/b00a8b15-dead-4c8f-9234-bfbf10f96a96.png",
    rating: 5
  },
  {
    id: 2,
    name: "MUNGUIKO THIERRY",
    company: "AU PIC INFO",
    text: "Agence finaliste de l'ex capitale de Mr Oredy MUSANDA dans le design de ligne site, a su faire du design de fonctionnalités remarquables et innovantes.",
    avatarUrl: "/lovable-uploads/21e4a9bf-f88f-4e91-b292-82cf70cfce10.png",
    rating: 5
  },
  {
    id: 3,
    name: "CT KAVYAVU JACKSON",
    company: "UCNDK",
    text: "Un très bon recensement des archives, analyse qualité / prix. Oredy MUSANDA vous aura satisfaits car les horaires qu'il a étudiés sont conformes aux vos attentes grâce à son technicien disponible sur tous besoins conformes au contrats.",
    avatarUrl: "/lovable-uploads/3d3dc0d2-e7e3-4c33-af97-b18f16a2bd23.png",
    rating: 5
  },
  {
    id: 4,
    name: "MAGLOIRE MUTULUVA",
    company: "MC CIPAC SULOAME KATINDO",
    text: "Un site plus fiable, c'est pour accomplir et refléchir au plus de qualité. Oredy Musanda a fait du design un parfait numérique qui correspond exactement à notre vision.",
    avatarUrl: "/lovable-uploads/22590fe0-2fc8-4f3b-9db6-0cbb305e61fe.png",
    rating: 5
  },
  {
    id: 5,
    name: "John TSONGO",
    company: "PANA RADIO",
    text: "A l'expertise de Mr Musanda, notre site reste à traiter ses produits et sa performance. Je recommande vivement leurs services pour toute entreprise cherchant à briller en ligne.",
    avatarUrl: "/lovable-uploads/031ac89b-6d19-4dc8-8e29-d6975a332519.png",
    rating: 5
  },
  {
    id: 6,
    name: "SANDRA PINK",
    company: "Artiste Musicienne",
    text: "Travail exceptionnel sur mon site portfolio. L'équipe a su capturer l'essence de mon art et créer une plateforme qui met vraiment en valeur mes créations musicales.",
    avatarUrl: "/lovable-uploads/SandraPink.JPG",
    rating: 5
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="testimonial-card p-6 h-full">
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-turquoise">
            <img 
              src={testimonial.avatarUrl} 
              alt={testimonial.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <Quote size={24} className="text-turquoise mb-2" />
          <p className="text-gray-300 mb-4 leading-relaxed">{testimonial.text}</p>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} size={16} className="text-yellow-400 fill-current" />
            ))}
          </div>
          
          <div>
            <h4 className="font-bold">{testimonial.name}</h4>
            <p className="text-sm text-gray-400">- {testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsPage = () => {
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setVisibleTestimonials(TESTIMONIALS);
  }, []);

  return (
    <div className="min-h-screen bg-darkGray text-white">
      <Header />
      
      <main className="pt-20">
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-turquoise">Témoignages</span> Clients
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Découvrez ce que nos clients satisfaits disent de nos services. 
                Leur succès est notre plus grande récompense.
              </p>
              <div className="flex items-center justify-center space-x-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-turquoise">50+</div>
                  <div className="text-gray-400">Projets réalisés</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-turquoise">100%</div>
                  <div className="text-gray-400">Clients satisfaits</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-turquoise">5★</div>
                  <div className="text-gray-400">Note moyenne</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16 p-8 bg-mediumGray rounded-lg">
              <h3 className="text-2xl font-bold mb-4">
                Rejoignez nos clients satisfaits
              </h3>
              <p className="text-gray-300 mb-6">
                Prêt à voir votre projet prendre vie ? Discutons de vos besoins 
                et créons ensemble quelque chose d'exceptionnel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn btn-primary">
                  Démarrer un projet
                </a>
                <a href="/portfolio/webdesign" className="btn btn-outline">
                  Voir nos réalisations
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TestimonialsPage;