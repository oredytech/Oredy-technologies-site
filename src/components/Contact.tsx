
import { useState } from 'react';
import { Facebook, Instagram, Mail } from 'lucide-react';
import { useEmailJS } from '@/hooks/useEmailJS';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { sendEmail, isLoading } = useEmailJS();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await sendEmail(formData);
    
    if (result.success) {
      toast.success('Message envoyé avec succès !');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      toast.error('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    }
  };

  return (
    <section id="contact" className="section bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Contactez <span className="text-turquoise">Moi</span> !
            </h2>
            <p className="text-muted-foreground mb-8">
              Si vous avez des idées, Je suis en ligne 24/7
            </p>
            
            <div className="space-y-6 mb-8">
              <div>
                <p className="text-muted-foreground">+243 815 066 176</p>
                <p className="text-muted-foreground">+243 996 886 079</p>
              </div>
              
              <p className="text-muted-foreground">contact@oredytech.com</p>
              
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61561656035139&mibextid=ZbWKwL" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-turquoise hover:text-black transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-turquoise hover:text-black transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-turquoise hover:text-black transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full">
                <input
                  type="text"
                  name="name"
                  placeholder="Entrez votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-secondary border border-border rounded-md focus:outline-none focus:border-turquoise text-foreground"
                  required
                />
              </div>
              
              <div className="w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="Votre Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-secondary border border-border rounded-md focus:outline-none focus:border-turquoise text-foreground"
                  required
                />
              </div>
              
              <div className="w-full">
                <input
                  type="text"
                  name="subject"
                  placeholder="Votre Numéro de Téléphone"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 bg-secondary border border-border rounded-md focus:outline-none focus:border-turquoise text-foreground"
                  required
                />
              </div>
              
              <div className="w-full">
                <textarea
                  name="message"
                  placeholder="Formulez-nous le 'what' ?"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-3 bg-secondary border border-border rounded-md focus:outline-none focus:border-turquoise text-foreground resize-none"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? 'ENVOI EN COURS...' : 'ENVOYER LE MESSAGE'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
