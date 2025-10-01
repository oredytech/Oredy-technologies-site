import { useState } from 'react';
import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_qbvhprf',
  TEMPLATE_ID: 'template_contact',
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY'
};

export const useEmailJS = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async (formData: {
    name: string;
    email: string;
    subject?: string;
    phone?: string;
    message: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: 'oredymusanda@gmail.com',
        subject: formData.subject || 'Nouveau message de contact',
        phone: formData.phone || 'Non fourni',
        message: formData.message,
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setIsLoading(false);
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de l\'envoi de l\'email:', err);
      setError('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
      setIsLoading(false);
      return { success: false, error: err };
    }
  };

  return { sendEmail, isLoading, error };
};
