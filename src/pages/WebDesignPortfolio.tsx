
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PortfolioItemType } from '@/components/portfolio/types';
import PortfolioList from '@/components/portfolio/PortfolioList';
import PortfolioModal from '@/components/portfolio/PortfolioModal';
import { usePortfolioData } from '@/components/portfolio/usePortfolioData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const shot = (url: string) =>
  `https://image.thum.io/get/width/800/crop/600/noanimate/${url}`;

const initialPortfolioItems: PortfolioItemType[] = [
  {
    id: 1,
    title: "Totalement Actus",
    imageUrl: shot("https://totalementactus.net"),
    url: "https://totalementactus.net",
    description: "Site d'actualité en ligne offrant des informations locales et internationales.",
    technologies: ["WordPress", "News CMS", "SEO"],
    isLoading: false,
  },
  {
    id: 2,
    title: "Kivu7",
    imageUrl: shot("https://kivu7.net"),
    url: "https://kivu7.net",
    description: "Plateforme d'information et de reportages sur la région du Kivu.",
    technologies: ["WordPress", "Responsive", "SEO"],
    isLoading: false,
  },
  {
    id: 3,
    title: "PNTS-CNTS",
    imageUrl: shot("https://pnts-cnts.org"),
    url: "https://pnts-cnts.org",
    description: "Site institutionnel du Programme National de Transfusion Sanguine.",
    technologies: ["WordPress", "Institutionnel"],
    isLoading: false,
  },
  {
    id: 4,
    title: "PESH ONG",
    imageUrl: shot("https://pesh-ngo.org"),
    url: "https://pesh-ngo.org",
    description: "Site officiel de l'ONG PESH, engagée dans le développement communautaire.",
    technologies: ["WordPress", "ONG", "Responsive"],
    isLoading: false,
  },
  {
    id: 5,
    title: "7 sur 7 Magazine",
    imageUrl: shot("http://7sur7magazine.net"),
    url: "http://7sur7magazine.net/",
    description: "Magazine d'actualité 7 jours sur 7 avec dossiers et reportages.",
    technologies: ["WordPress", "Magazine", "News"],
    isLoading: false,
  },
  {
    id: 6,
    title: "La Fortune RDC",
    imageUrl: shot("https://lafortunerdc.net"),
    url: "https://lafortunerdc.net",
    description: "Site d'actualités et d'informations sur la République Démocratique du Congo.",
    technologies: ["WordPress", "News CMS", "SEO"],
    isLoading: false,
  },
  {
    id: 7,
    title: "Kivu Citizens",
    imageUrl: shot("https://kivucitizens.net"),
    url: "https://kivucitizens.net",
    description: "Plateforme citoyenne d'information et d'engagement communautaire au Kivu.",
    technologies: ["WordPress", "Communauté", "News"],
    isLoading: false,
  },
  {
    id: 8,
    title: "Bi450",
    imageUrl: shot("https://bi450.com"),
    url: "https://bi450.com/",
    description: "Site web moderne et responsive avec design personnalisé.",
    technologies: ["WordPress", "Design", "Responsive"],
    isLoading: false,
  },
  {
    id: 9,
    title: "Pana Radio",
    imageUrl: shot("https://panaradio.net"),
    url: "https://panaradio.net",
    description: "Radio en ligne avec streaming direct et grille de programmes.",
    technologies: ["WordPress", "Audio Streaming", "Radio"],
    isLoading: false,
  },
  {
    id: 10,
    title: "Goma Webradio",
    imageUrl: shot("https://gomawebradio.com"),
    url: "https://gomawebradio.com",
    description: "Site d'information couplé à une radio en ligne, actualité locale et streaming.",
    technologies: ["WordPress", "Radio", "News"],
    isLoading: false,
  },
  {
    id: 11,
    title: "KAKO FM 97.2 MHz",
    imageUrl: shot("https://kakofm.net"),
    url: "https://kakofm.net",
    description: "Radio & Télévision Kako - la voix de la jeunesse engagée, streaming direct.",
    technologies: ["WordPress", "Audio Streaming"],
    isLoading: false,
  },
];

const WebDesignPortfolio = () => {
  const { portfolioItems, selectedItem, setSelectedItem } = usePortfolioData(initialPortfolioItems);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          <div className="mb-10">
            <Link to="/#services" className="inline-flex items-center text-primary hover:underline mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Retour aux services
            </Link>
            <div className="text-center bg-muted rounded-lg p-8 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-primary">Mes réalisations</h1>
              <p className="text-muted-foreground">Découvrez les sites web que j'ai conçus et développés.</p>
            </div>
          </div>

          <PortfolioList items={portfolioItems} onItemSelect={setSelectedItem} />

          {selectedItem && <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WebDesignPortfolio;
