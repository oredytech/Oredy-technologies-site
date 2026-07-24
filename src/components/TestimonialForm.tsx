import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const LS_KEY = 'user_testimonials_local';

export type LocalTestimonial = {
  id: string;
  name: string;
  company?: string;
  message: string;
  rating: number;
  createdAt: string;
};

export const readLocalTestimonials = (): LocalTestimonial[] => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  } catch {
    return [];
  }
};

const TestimonialForm = ({ onSubmitted }: { onSubmitted?: (t: LocalTestimonial) => void }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || rating < 1) {
      toast.error('Merci de remplir votre nom, un message et une note.');
      return;
    }
    setSubmitting(true);

    // Attempt to save to backend; if the table isn't available yet, fall back to local storage
    try {
      // @ts-expect-error - table may not yet exist in generated types
      const { error } = await supabase.from('user_testimonials').insert({
        name: name.trim(),
        company: company.trim() || null,
        message: message.trim(),
        rating,
      });
      if (error) throw error;
    } catch (err) {
      console.warn('Fallback to localStorage for testimonial:', err);
    }

    const local: LocalTestimonial = {
      id: crypto.randomUUID(),
      name: name.trim(),
      company: company.trim() || undefined,
      message: message.trim(),
      rating,
      createdAt: new Date().toISOString(),
    };
    const all = [local, ...readLocalTestimonials()].slice(0, 20);
    localStorage.setItem(LS_KEY, JSON.stringify(all));
    onSubmitted?.(local);

    toast.success('Merci pour votre témoignage !');
    setName(''); setCompany(''); setMessage(''); setRating(0);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="card max-w-2xl mx-auto space-y-4">
      <h3 className="font-display text-2xl text-primary">Laissez votre témoignage</h3>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Votre note :</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(s)}
              className="transition-transform hover:scale-110"
              aria-label={`${s} étoile${s > 1 ? 's' : ''}`}
            >
              <Star
                size={26}
                className={s <= (hover || rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom *"
          className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Entreprise / Organisation (optionnel)"
          className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Votre témoignage *"
        rows={4}
        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary inline-flex items-center gap-2 disabled:opacity-60"
      >
        <Send size={16} />
        {submitting ? 'Envoi…' : 'Envoyer mon témoignage'}
      </button>
    </form>
  );
};

export default TestimonialForm;
