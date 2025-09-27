
import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  text: string;
  avatarUrl: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Nathanael Lusuka",
    company: "KIVU REPORTER",
    text: "Très satisfait",
    avatarUrl: "/lovable-uploads/b00a8b15-dead-4c8f-9234-bfbf10f96a96.png"
  },
  {
    id: 2,
    name: "MUNGUIKO THIERRY",
    company: "AU PIC INFO",
    text: "Agence finaliste de lex capitale de Mr Oredy MUSANDA dans le design de ligne site, a su faire du design de fonctionnalités.",
    avatarUrl: "/lovable-uploads/21e4a9bf-f88f-4e91-b292-82cf70cfce10.png"
  },
  {
    id: 3,
    name: "CT KAVYAVU JACKSON",
    company: "UCNDK",
    text: "Un très bon recensement des archives, analyse qualité / prix. Oredy MUSANDA vous aura satisfaits car les horaires qu'il a étudiés sont conformes aux vos attentes grâce à son technicien disponible sur tous besoins conformes au contrats.",
    avatarUrl: "/lovable-uploads/3d3dc0d2-e7e3-4c33-af97-b18f16a2bd23.png"
  },
  {
    id: 4,
    name: "MAGLOIRE MUTULUVA",
    company: "MC CIPAC SULOAME KATINDO",
    text: "Un site plus fiable, c'est pour accomplir et refléchicher au plus de qualité. Oredy Musanda a fait du design un parfait numérique.",
    avatarUrl: "/lovable-uploads/22590fe0-2fc8-4f3b-9db6-0cbb305e61fe.png"
  },
  {
    id: 5,
    name: "John TSONGO",
    company: "PANA RADIO",
    text: "A l'expertise de Mr Musanda, notre site reste à traiter ses produits et sa performance. Je recommande vivement leurs services pour toute entreprise cherchant à briller en ligne.",
    avatarUrl: "/lovable-uploads/031ac89b-6d19-4dc8-8e29-d6975a332519.png"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="testimonial-card p-6">
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
        <div>
          <Quote size={24} className="text-turquoise mb-2" />
          <p className="text-gray-300 mb-4">{testimonial.text}</p>
          <div>
            <h4 className="font-bold">{testimonial.name}</h4>
            <p className="text-sm text-gray-400">- {testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setVisibleTestimonials(TESTIMONIALS);
  }, []);

  return (
    <section id="testimonials" className="section bg-mediumGray">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-gray-400 mb-2">Nous distinguons dans nos core visual les</p>
          <h2 className="section-title">Témoignages des clients satisfaits</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
