
import { Quote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWordPressTestimonials } from '@/hooks/useWordPressTestimonials';

interface Testimonial {
  id: string | number;
  name: string;
  company: string;
  text: string;
  avatarUrl?: string;
  rating?: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Nathanael Lusuka",
    company: "KIVU REPORTER",
    text: "Très satisfait",
    avatarUrl: "/lovable-uploads/b00a8b15-dead-4c8f-9234-bfbf10f96a96.png",
    rating: 5,
  },
  {
    id: 2,
    name: "MUNGUIKO THIERRY",
    company: "AU PIC INFO",
    text: "Agence finaliste de lex capitale de Mr Oredy MUSANDA dans le design de ligne site, a su faire du design de fonctionnalités.",
    avatarUrl: "/lovable-uploads/21e4a9bf-f88f-4e91-b292-82cf70cfce10.png",
    rating: 5,
  },
  {
    id: 3,
    name: "CT KAVYAVU JACKSON",
    company: "UCNDK",
    text: "Un très bon recensement des archives, analyse qualité / prix. Oredy MUSANDA vous aura satisfaits car les horaires qu'il a étudiés sont conformes aux vos attentes grâce à son technicien disponible sur tous besoins conformes au contrats.",
    avatarUrl: "/lovable-uploads/3d3dc0d2-e7e3-4c33-af97-b18f16a2bd23.png",
    rating: 5,
  },
  {
    id: 4,
    name: "MAGLOIRE MUTULUVA",
    company: "MC CIPAC SULOAME KATINDO",
    text: "Un site plus fiable, c'est pour accomplir et refléchicher au plus de qualité. Oredy Musanda a fait du design un parfait numérique.",
    avatarUrl: "/lovable-uploads/22590fe0-2fc8-4f3b-9db6-0cbb305e61fe.png",
    rating: 5,
  },
  {
    id: 5,
    name: "John TSONGO",
    company: "PANA RADIO",
    text: "A l'expertise de Mr Musanda, notre site reste à traiter ses produits et sa performance. Je recommande vivement leurs services pour toute entreprise cherchant à briller en ligne.",
    avatarUrl: "/lovable-uploads/031ac89b-6d19-4dc8-8e29-d6975a332519.png",
    rating: 5,
  },
];

const StarsRow = ({ value = 0 }: { value?: number }) => (
  <div className="flex gap-0.5 mb-2">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={16} className={s <= value ? 'fill-accent text-accent' : 'text-muted-foreground'} />
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="testimonial-card p-6">
      <div className="flex items-start space-x-4">
        {testimonial.avatarUrl ? (
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
              <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-full h-full object-cover" />
            </div>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0 font-bold text-primary text-xl">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <StarsRow value={testimonial.rating ?? 5} />
          <Quote size={20} className="text-primary mb-2" />
          <p className="text-muted-foreground mb-4">{testimonial.text}</p>
          <div>
            <h4 className="font-bold">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">- {testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { testimonials: wpTestimonials } = useWordPressTestimonials(20);

  const combined: Testimonial[] = [
    ...wpTestimonials.map((t) => ({
      id: `wp-${t.id}`,
      name: t.name,
      company: t.company || '',
      text: t.message,
      avatarUrl: t.avatarUrl || undefined,
      rating: t.rating,
    })),
    ...TESTIMONIALS,
  ];

  return (
    <section id="testimonials" className="section bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-muted-foreground mb-2">Ils me font confiance</p>
          <h2 className="section-title">Témoignages des clients satisfaits</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {combined.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/temoignages" className="btn btn-primary inline-flex items-center gap-2">
            <Star size={16} />
            Laisser un témoignage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

