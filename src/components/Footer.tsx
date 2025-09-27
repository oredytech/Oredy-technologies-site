
import { ChevronUp, Phone, Mail, MapPin, Youtube, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black py-12 relative">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-turquoise rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">O</span>
              </div>
              <span className="text-xl font-bold text-white">OREDY TECH</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre partenaire digital pour des solutions web innovantes et performantes. 
              Développement, design et stratégies digitales sur mesure.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Liens Rapides</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-400 hover:text-turquoise transition-colors text-sm">
                Accueil
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-turquoise transition-colors text-sm">
                À propos
              </Link>
              <Link to="/services" className="text-gray-400 hover:text-turquoise transition-colors text-sm">
                Services
              </Link>
              <Link to="/wordpress-portfolio" className="text-gray-400 hover:text-turquoise transition-colors text-sm">
                Portfolio
              </Link>
              <Link to="/blog" className="text-gray-400 hover:text-turquoise transition-colors text-sm">
                Blog
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-turquoise transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-turquoise" />
                <span className="text-gray-400 text-sm">+243 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-turquoise" />
                <span className="text-gray-400 text-sm">contact@oredytech.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-turquoise" />
                <span className="text-gray-400 text-sm">Goma, RD Congo</span>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.youtube.com/@oredytech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a 
                href="https://www.facebook.com/share/17JpFiWiz6/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              Copyright © 2024 Tout droit réservé | OREDY TECHNOLOGIES
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-turquoise transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-turquoise transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToTop}
        className="absolute right-8 bottom-8 w-12 h-12 bg-turquoise rounded-full flex items-center justify-center text-black hover:bg-turquoise/80 transition-colors shadow-lg"
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;
