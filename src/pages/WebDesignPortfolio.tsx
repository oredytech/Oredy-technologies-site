
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
    imageUrl: "/lovable-uploads/GOWERA.JPG",
    url: "https://gowera.com",
    description: "Une plateforme de streaming radio gratuite, connectant les auditeurs aux stations du monde entier en un clic.",
    technologies: ["React", "Node.js", "CSS3", "API Integration"],
    isLoading: true
  },
  {
    id: 3,
    title: "FOMUBISA-ASBL",
    imageUrl: "/lovable-uploads/FOMUBISA.ORG.JPG",
    url: "https://fomubisa.org",
    description: "Site institutionnel déterminé pour la réhabilitation de la dignité de la femme congolaise, luttant contre les violences basées sur le genre.",
    technologies: ["WordPress", "CSS3", "Responsive Design", "JavaScript"],
    isLoading: true
  },
  {
    id: 4,
    title: "KAKO FM 97.2 MHz",
    imageUrl: "/lovable-uploads/KAKOFM.NET.JPG",
    url: "https://kakofm.net",
    description: "Radio & Télévision Kako - La voix de la jeunesse engagée, avec streaming en direct et programmes interactifs.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Audio Streaming"],
    isLoading: true
  },
  {
    id: 5,
    title: "La Fortune RDC",
    imageUrl: "/lovable-uploads/LA_FORTURE_RDC_lafortunerdc.net.JPG",
    url: "https://lafortunerdc.net",
    description: "Site d'actualités et d'informations sur la République Démocratique du Congo avec contenu multimédia riche.",
    technologies: ["WordPress", "News CMS", "Responsive Design", "SEO"],
    isLoading: true
  },
  {
    id: 6,
    title: "Radio Sauti ya Injili",
    imageUrl: "/lovable-uploads/RSIRDC.JPG",
    url: "https://rsirdc.org",
    description: "Radio chrétienne à Goma, diffusant la Bonne Nouvelle à travers le monde avec streaming en direct.",
    technologies: ["WordPress", "Audio Streaming", "Responsive Design", "CMS"],
    isLoading: true
  },
  {
    id: 7,
    title: "Visite Congo",
    imageUrl: "/lovable-uploads/VISITECONGO.NET.JPG",
    url: "https://visitecongo.net",
    description: "Premier site du tourisme en ligne pour découvrir la RDC dans toute sa splendeur avec galeries et documentaires.",
    technologies: ["WordPress", "Tourism CMS", "Gallery", "Responsive Design"],
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
