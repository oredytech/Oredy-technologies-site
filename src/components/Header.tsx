import { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchDialog from './SearchDialog';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkCls = "text-primary-foreground hover:text-white transition-colors font-medium";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary ${isScrolled ? 'py-3 shadow-lg' : 'py-4'}`}>
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="font-display text-xl md:text-2xl font-black text-primary-foreground tracking-tight">
              OREDY MUSANDA
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/" className={linkCls}>Accueil</Link>
            <Link to="/about" className={linkCls}>À propos</Link>
            <Link to="/services" className={linkCls}>Services</Link>
            <Link to="/blog" className={linkCls}>Blog</Link>
            <Link to="/boutique" className={linkCls}>Boutique</Link>
            <Link to="/marketplace" className={linkCls}>Marché</Link>
            <Link to="/contact" className={linkCls}>Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              className="text-primary-foreground hover:text-white transition-colors"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="lg:hidden text-primary-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-primary animate-fadeIn">
            <div className="container py-5 flex flex-col space-y-4">
              <Link to="/" className={`${linkCls} py-2`} onClick={() => setMobileMenuOpen(false)}>Accueil</Link>
              <Link to="/about" className={`${linkCls} py-2`} onClick={() => setMobileMenuOpen(false)}>À propos</Link>
              <Link to="/services" className={`${linkCls} py-2`} onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <Link to="/blog" className={`${linkCls} py-2`} onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link to="/boutique" className={`${linkCls} py-2`} onClick={() => setMobileMenuOpen(false)}>Boutique</Link>
              <Link to="/marketplace" className={`${linkCls} py-2`} onClick={() => setMobileMenuOpen(false)}>Marché</Link>
              <Link to="/contact" className={`${linkCls} py-2`} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Header;
