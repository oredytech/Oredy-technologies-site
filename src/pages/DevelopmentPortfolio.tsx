
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortfolioList from '@/components/portfolio/PortfolioList';
import PortfolioModal from '@/components/portfolio/PortfolioModal';
import { PortfolioItemType } from '@/components/portfolio/types';
import { usePortfolioData } from '@/components/portfolio/usePortfolioData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DevelopmentPortfolio = () => {
  const initialPortfolioItems: PortfolioItemType[] = [
    {
      id: 1,
      title: "Site d'information et radio en ligne",
      imageUrl: "/lovable-uploads/7c4231fc-4528-4ab5-a4ae-283376f13464.png",
      url: "https://gomawebradio.com",
      description: "Un site web d'information couplé à une radio en ligne, offrant un accès direct à l'actualité locale et aux émissions en streaming.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      isLoading: true
    },
    {
      id: 2,
      title: "Site d'Artiste",
      imageUrl: "/lovable-uploads/2e926fd3-e843-4933-9f60-81ebf24c44e9.png",
      url: "https://sandrapinklinda.com/",
      description: "Un site web artistique offrant un accès à l'actualités de l'artiste Sandra Pink Linda.",
      technologies: ["HTML", "CSS", "JavaScrip", "blog"],
      isLoading: true
    },
    {
      id: 3,
      title: "GOWERA",
      imageUrl: "/gowera.JPG",
      url: "https://gowera.com",
      description: "Application de radio en ligne.",
      technologies: ["TypeScript", "Radio API"],
      isLoading: true
    },
  ];

  const { portfolioItems, selectedItem, setSelectedItem } = usePortfolioData(initialPortfolioItems);

  return (
    <div className="min-h-screen bg-darkGray text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          <div className="mb-10">
            <Link to="/#services" className="inline-flex items-center text-turquoise hover:underline mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Retour aux services
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Projets de Développement</h1>
            <p className="text-gray-400">Découvrez mes projets de développement d'applications web et mobiles.</p>
          </div>

          <PortfolioList 
            items={portfolioItems} 
            onItemSelect={setSelectedItem} 
          />

          {selectedItem && (
            <PortfolioModal 
              item={selectedItem} 
              onClose={() => setSelectedItem(null)} 
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DevelopmentPortfolio;
