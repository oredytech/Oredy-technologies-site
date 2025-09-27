
import { useState } from 'react';
import { ArrowLeft, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWordPressLogos } from '@/hooks/useWordPressLogos';
import WordPressPortfolioItem, { WordPressProject } from '@/components/portfolio/WordPressPortfolioItem';
import WordPressPortfolioModal from '@/components/portfolio/WordPressPortfolioModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const initialProjects: WordPressProject[] = [
  {
    id: 1,
    title: "Totalement Actus",
    imageUrl: "/lovable-uploads/6a9984fe-a9bb-4fe7-8b59-8222fd6c6332.png",
    url: "https://totalementactus.net/",
    description: "Un site d'actualités générales avec des articles sur différents sujets d'intérêt.",
    isLoading: true
  },
  {
    id: 2,
    title: "Kivu7",
    imageUrl: "/lovable-uploads/6a9984fe-a9bb-4fe7-8b59-8222fd6c6332.png",
    url: "https://kivu7.net",
    description: "Une plateforme d'information régionale couvrant les actualités du Kivu.",
    isLoading: true
  },
  {
    id: 3,
    title: "Radio Tayna",
    imageUrl: "/lovable-uploads/6a9984fe-a9bb-4fe7-8b59-8222fd6c6332.png",
    url: "https://radiotayna.com",
    description: "Site web d'une station de radio proposant des émissions et des podcasts variés.",
    isLoading: true
  },
  {
    id: 4,
    title: "RCVMA",
    imageUrl: "/lovable-uploads/6a9984fe-a9bb-4fe7-8b59-8222fd6c6332.png",
    url: "https://rcvma.net",
    description: "Une plateforme médiatique avec une couverture des événements actuels.",
    isLoading: true
  }
];

const WordPressPortfolio = () => {
  const [selectedItem, setSelectedItem] = useState<WordPressProject | null>(null);
  const projectsWithLogos = useWordPressLogos(initialProjects);

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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Projets WordPress</h1>
            <p className="text-gray-400">Découvrez mes réalisations WordPress personnalisées pour divers clients.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsWithLogos.map((item) => (
              <WordPressPortfolioItem 
                key={item.id} 
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>

          {selectedItem && (
            <WordPressPortfolioModal
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

export default WordPressPortfolio;
