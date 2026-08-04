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
              <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-full h-full object-cover" loading="lazy" />
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
            {testimonial.company && (
              <p className="text-sm text-muted-foreground">- {testimonial.company}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { testimonials: wpTestimonials, loading } = useWordPressTestimonials(20);

  const items: Testimonial[] = wpTestimonials.map((t) => ({
    id: `wp-${t.id}`,
    name: t.name,
    company: t.company || '',
    text: t.message,
    avatarUrl: t.avatarUrl || undefined,
    rating: t.rating,
  }));

  return (
    <section id="testimonials" className="section bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-muted-foreground mb-2">Ils me font confiance</p>
          <h2 className="section-title">Témoignages des clients satisfaits</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[1, 2].map((i) => (
              <div key={i} className="testimonial-card p-6 h-40 animate-pulse bg-card/60" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {items.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground mb-12">
            Aucun témoignage publié pour le moment. Soyez le premier à partager votre expérience !
          </p>
        )}

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

