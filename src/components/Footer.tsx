
import { ChevronUp, Phone, Mail, MapPin, Youtube, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
const fabromLogoUrl = '/__l5e/assets-v1/ef152028-8017-4f4f-b961-1da269cab4ea/fabrom-logo.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkClass = "text-primary-foreground/90 hover:text-accent transition-colors text-sm";
  const iconClass = "text-accent";

  return (
    <footer className="bg-[hsl(0_78%_22%)] text-primary-foreground py-12 relative">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/lovable-uploads/87061d3a-bd9e-4646-a028-77c0524dc6b5.png"
                alt="OREDY Technologies Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Votre partenaire digital pour des solutions web innovantes et performantes.
              Développement, design et stratégies digitales sur mesure.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Liens Rapides</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className={linkClass}>Accueil</Link>
              <Link to="/about" className={linkClass}>À propos</Link>
              <Link to="/services" className={linkClass}>Services</Link>
              <Link to="/wordpress-portfolio" className={linkClass}>Portfolio</Link>
              <Link to="/blog" className={linkClass}>Blog</Link>
              <Link to="/contact" className={linkClass}>Contact</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className={iconClass} />
                <span className="text-primary-foreground/90 text-sm">+243851006476</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className={iconClass} />
                <span className="text-primary-foreground/90 text-sm">+243996886079</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className={iconClass} />
                <span className="text-primary-foreground/90 text-sm">contact@oredytech.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className={iconClass} />
                <span className="text-primary-foreground/90 text-sm">Goma, RD Congo</span>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="https://www.youtube.com/@oredytech" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-primary-foreground hover:bg-accent hover:text-primary transition-colors">
                <Youtube size={18} />
              </a>
              <a href="https://www.facebook.com/share/17JpFiWiz6/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-primary-foreground hover:bg-accent hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-primary-foreground hover:bg-accent hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-primary-foreground hover:bg-accent hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Informations légales / fiscales */}
        <div className="border-t border-primary-foreground/20 pt-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <img src={fabromLogoUrl} alt="Logo Ets FABROM" className="h-16 w-auto flex-shrink-0" />
            <div className="text-primary-foreground/90 text-sm space-y-1">
              <p className="text-accent font-semibold">FABRICE OREDY MUSANDA — FABROM</p>
              <p>
                <span className="text-accent">RCCM :</span>{' '}
                <a href="https://rccm.cd/" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
                  CD/KNM/RCCM/26-A-02595
                </a>
                <span className="mx-2">|</span>
                <span className="text-accent">Id Nat :</span> 01-G4701-N00001R
              </p>
              <p className="text-xs text-primary-foreground/70">
                <a href="https://rccm.cd/" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
                  Vérifier mon RCCM sur rccm.cd →
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-primary-foreground/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/80 text-sm mb-4 md:mb-0">
              Copyright © 2024 Tout droit réservé | OREDY TECHNOLOGIES
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className={linkClass}>Politique de confidentialité</Link>
              <Link to="/terms-of-service" className={linkClass}>Conditions d'utilisation</Link>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="absolute right-8 bottom-8 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary hover:brightness-110 transition-colors shadow-lg"
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;
