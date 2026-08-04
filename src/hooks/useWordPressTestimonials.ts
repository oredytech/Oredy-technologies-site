import { useState, useEffect, useCallback } from 'react';

export const WP_TESTIMONIALS_API = 'https://oredytech.com/wp-json/oredy/v1/testimonials';

export interface WpTestimonial {
  id: number;
  name: string;
  company: string | null;
  message: string;
  rating: number;
  avatarUrl: string | null;
  date: string;
}

export const useWordPressTestimonials = (perPage = 20) => {
  const [testimonials, setTestimonials] = useState<WpTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${WP_TESTIMONIALS_API}?per_page=${perPage}`);
      if (!res.ok) throw new Error('Impossible de charger les témoignages.');
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }, [perPage]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return { testimonials, loading, error, refetch: fetchTestimonials };
};

export const submitWordPressTestimonial = async (payload: {
  name: string;
  company?: string;
  email?: string;
  message: string;
  rating: number;
  image?: File | null;
}) => {
  const form = new FormData();
  form.append('name', payload.name);
  form.append('company', payload.company || '');
  form.append('email', payload.email || '');
  form.append('message', payload.message);
  form.append('rating', String(payload.rating));
  if (payload.image) form.append('image', payload.image);

  const res = await fetch(WP_TESTIMONIALS_API, { method: 'POST', body: form });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || "L'envoi du témoignage a échoué.");
  }
  return data;
};
