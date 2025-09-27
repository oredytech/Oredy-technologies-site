
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { PortfolioItemType } from '@/components/portfolio/types';
import PortfolioList from '@/components/portfolio/PortfolioList';
import PortfolioModal from '@/components/portfolio/PortfolioModal';
import { usePortfolioData } from '@/components/portfolio/usePortfolioData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const initialPortfolioItems: PortfolioItemType[] = [
  {
    id: 1,
    title: "Goma Webradio",
    imageUrl: "/lovable-uploads/GOMA WEBRADIO.JPG",
    url: "https://gomawebradio.com",
    description: "Site web d'information couplé à une radio en ligne, offrant un accès direct à l'actualité locale et aux émissions en streaming.",
    technologies: ["WordPress", "HTML5", "CSS3", "JavaScript"],
    isLoading: true
  },
  {
    id: 2,
    title: "GOWERA",
    imageUrl: "/lovable-uploads/6a9984fe-a9bb-4fe7-8b59-8222fd6c6332.png",
    url: "https://gowera.com",
    description: "Une plateforme de streaming radio gratuite, connectant les auditeurs aux stations du monde entier en un clic.",
    technologies: ["React", "Node.js", "CSS3", "API Integration"],
    isLoading: true
  },
  {
    id: 3,
    title: "RSIRDC",
    imageUrl: "/lovable-uploads/6a9984fe-a9bb-4fe7-8b59-8222fd6c6332.png",
    url: "https://rsirdc.org",
    description: "Site institutionnel avec design moderne et intuitif pour une organisation non gouvernementale.",
    technologies: ["WordPress", "Elementor", "PHP", "jQuery"],
    isLoading: true
  },
  {
    id: 4,
    title: "Site Vitrine Entreprise",
    imageUrl: "/lovable-uploads/6a9984fe-a9bb-4fe7-8b59-8222fd6c6332.png",
    url: "https://corporate-webdesign.example.com",
    description: "Site vitrine pour une entreprise de conseil avec un design épuré et professionnel.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    isLoading: true
  }
];

const WebDesignPortfolio = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Projets Web Design</h1>
            <p className="text-gray-400">Découvrez mes créations web design et interfaces utilisateur.</p>
          </div>

          <PortfolioList 
            items={portfolioItems}
            onItemSelect={setSelectedItem}
          />

          {selectedItem && <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WebDesignPortfolio;
