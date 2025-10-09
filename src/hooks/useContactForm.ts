import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Le nom doit contenir moins de 100 caractères"),
  email: z.string().trim().email("Email invalide").max(255, "L'email doit contenir moins de 255 caractères"),
  phone: z.string().trim().max(20, "Le téléphone doit contenir moins de 20 caractères").optional(),
  subject: z.string().trim().min(1, "Le type de projet est requis"),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(2000, "Le message doit contenir moins de 2000 caractères"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const useContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (formData: ContactFormData) => {
    setIsLoading(true);
    
    try {
      // Valider les données
      const validatedData = contactSchema.parse(formData);
      
      console.log('Sending contact email with data:', validatedData);
      
      // Appeler l'edge function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: validatedData,
      });

      if (error) {
        console.error('Error calling edge function:', error);
        throw error;
      }

      console.log('Email sent successfully:', data);
      return { success: true };
    } catch (error: any) {
      console.error('Error in sendEmail:', error);
      return { 
        success: false, 
        error: error.message || 'Une erreur est survenue lors de l\'envoi du message' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEmail, isLoading };
};
