import { useState } from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    alert('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
  };

  return (
    <div className="min-h-screen bg-darkGray text-white">
      <Header />
      
      <main className="pt-20">
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Contactez <span className="text-turquoise">OREDY</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Vous avez un projet en tête ? Une question ? N'hésitez pas à me contacter. 
                Je suis disponible 24/7 pour transformer vos idées en réalité numérique.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Informations de contact */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-turquoise">Informations de contact</h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-turquoise/20 rounded-lg flex items-center justify-center">
                          <Phone className="text-turquoise" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Téléphone</h4>
                          <p className="text-gray-300">+243 815 066 176</p>
                          <p className="text-gray-300">+243 996 886 079</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-turquoise/20 rounded-lg flex items-center justify-center">
                          <Mail className="text-turquoise" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Email</h4>
                          <p className="text-gray-300">contact@oredytech.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-turquoise/20 rounded-lg flex items-center justify-center">
                          <MapPin className="text-turquoise" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Localisation</h4>
                          <p className="text-gray-300">Goma, Nord-Kivu</p>
                          <p className="text-gray-300">République Démocratique du Congo</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-turquoise/20 rounded-lg flex items-center justify-center">
                          <Clock className="text-turquoise" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Disponibilité</h4>
                          <p className="text-gray-300">24/7 pour vos projets</p>
                          <p className="text-gray-300">Réponse sous 24h</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Suivez-moi</h4>
                    <div className="flex space-x-4">
                      <a 
                        href="https://www.facebook.com/profile.php?id=61561656035139&mibextid=ZbWKwL" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-white hover:bg-turquoise hover:text-black transition-colors"
                      >
                        <Facebook size={20} />
                      </a>
                      <a 
                        href="#" 
                        className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-white hover:bg-turquoise hover:text-black transition-colors"
                      >
                        <Instagram size={20} />
                      </a>
                      <a 
                        href="mailto:contact@oredytech.com" 
                        className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-white hover:bg-turquoise hover:text-black transition-colors"
                      >
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire de contact */}
              <div className="lg:col-span-2">
                <div className="bg-mediumGray p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-6">Envoyez-moi un message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Votre nom complet"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-turquoise text-white"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Adresse email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-turquoise text-white"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Numéro de téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="+243 XXX XXX XXX"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-turquoise text-white"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Type de projet *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-turquoise text-white"
                          required
                        >
                          <option value="">Sélectionnez un type</option>
                          <option value="web-design">Web Design</option>
                          <option value="wordpress">Développement WordPress</option>
                          <option value="development">Développement sur mesure</option>
                          <option value="consultation">Consultation</option>
                          <option value="other">Autre</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Décrivez votre projet, vos besoins, votre budget approximatif..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-turquoise text-white resize-none"
                        required
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn btn-primary w-full"
                    >
                      ENVOYER LE MESSAGE
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* FAQ rapide */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-4">Questions fréquemment posées</h3>
                <p className="text-gray-300">Quelques réponses aux questions les plus courantes</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="card">
                  <h4 className="font-semibold mb-2">Quel est le délai moyen pour un projet ?</h4>
                  <p className="text-gray-300 text-sm">
                    Cela dépend de la complexité du projet. Un site vitrine simple prend 1-2 semaines, 
                    tandis qu'un projet plus complexe peut nécessiter 4-8 semaines.
                  </p>
                </div>
                
                <div className="card">
                  <h4 className="font-semibold mb-2">Proposez-vous un service de maintenance ?</h4>
                  <p className="text-gray-300 text-sm">
                    Oui, je propose des services de maintenance et de support continus 
                    pour assurer le bon fonctionnement de votre site.
                  </p>
                </div>
                
                <div className="card">
                  <h4 className="font-semibold mb-2">Travaillez-vous avec des clients internationaux ?</h4>
                  <p className="text-gray-300 text-sm">
                    Absolument ! Je travaille avec des clients du monde entier et je suis 
                    disponible pour des échanges en français et anglais.
                  </p>
                </div>
                
                <div className="card">
                  <h4 className="font-semibold mb-2">Comment se déroule le processus de développement ?</h4>
                  <p className="text-gray-300 text-sm">
                    Analyse des besoins → Maquette → Développement → Tests → 
                    Livraison → Maintenance. Je vous tiens informé à chaque étape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;