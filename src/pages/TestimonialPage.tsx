import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, Send, ImagePlus, X, Quote, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWordPressTestimonials, submitWordPressTestimonial } from '@/hooks/useWordPressTestimonials';

const StarsRow = ({ value = 0 }: { value?: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={16} className={s <= value ? 'fill-accent text-accent' : 'text-muted-foreground'} />
    ))}
  </div>
);

const TestimonialPage = () => {
  const { testimonials, loading, refetch } = useWordPressTestimonials(30);

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File | null) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      toast.error('Format accepté : JPG, PNG, WEBP ou GIF.');
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.error('Image trop lourde (3 Mo maximum).');
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || rating < 1) {
      toast.error('Merci de renseigner votre nom, votre message et une note.');
      return;
    }
    setSubmitting(true);
    try {
      await submitWordPressTestimonial({
        name: name.trim(),
        company: company.trim(),
        email: email.trim(),
        message: message.trim(),
        rating,
        image,
      });
      toast.success('Merci ! Votre témoignage sera publié après validation.');
      setName(''); setCompany(''); setEmail(''); setMessage(''); setRating(0);
      clearImage();
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "L'envoi a échoué, merci de réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Laisser un témoignage | Oredy MUSANDA</title>
        <meta
          name="description"
          content="Partagez votre expérience de collaboration avec Oredy MUSANDA : note en étoiles, message et photo ou logo de votre organisation."
        />
        <link rel="canonical" href="https://oredytech.com/temoignages" />
      </Helmet>

      <Header />

      <main className="pt-28 pb-20">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-muted-foreground mb-2">Votre avis compte</p>
            <h1 className="section-title">Laisser un témoignage</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Racontez votre expérience, attribuez une note et ajoutez si vous le souhaitez votre photo ou le logo de
              votre organisation. Chaque témoignage est publié après validation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card max-w-2xl mx-auto space-y-5">
            <div className="flex items-center gap-3">
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
                    <Star size={28} className={s <= (hover || rating) ? 'fill-accent text-accent' : 'text-muted-foreground'} />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom *"
                maxLength={100}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Entreprise / Organisation"
                maxLength={120}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email (non publié)"
              maxLength={255}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Votre témoignage *"
              rows={5}
              maxLength={2000}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />

            <div className="flex items-center gap-4">
              {preview ? (
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                    <img src={preview} alt="Aperçu de votre photo" className="w-full h-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-1"
                    aria-label="Retirer l'image"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-20 h-20 rounded-full border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  aria-label="Ajouter une photo ou un logo"
                >
                  <ImagePlus size={22} />
                </button>
              )}
              <div className="text-sm text-muted-foreground">
                Photo ou logo (optionnel)
                <br />
                JPG, PNG, WEBP — 3 Mo max.
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary inline-flex items-center gap-2 disabled:opacity-60"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {submitting ? 'Envoi…' : 'Envoyer mon témoignage'}
            </button>
          </form>

          <section className="mt-20">
            <h2 className="section-title text-center mb-10">Témoignages publiés</h2>

            {loading ? (
              <div className="flex justify-center py-10 text-muted-foreground">
                <Loader2 className="animate-spin" />
              </div>
            ) : testimonials.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Aucun témoignage publié pour le moment. Soyez le premier !
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((t) => (
                  <article key={t.id} className="testimonial-card p-6">
                    <div className="flex items-start space-x-4">
                      {t.avatarUrl ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                          <img src={t.avatarUrl} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0 font-bold text-primary text-xl">
                          {t.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <StarsRow value={t.rating} />
                        <Quote size={20} className="text-primary my-2" />
                        <p className="text-muted-foreground mb-4">{t.message}</p>
                        <h3 className="font-bold">{t.name}</h3>
                        {t.company && <p className="text-sm text-muted-foreground">- {t.company}</p>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TestimonialPage;
