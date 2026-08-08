import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Brand = {
  name: string;
  tagline: string;
  description: string;
  url?: string;
  logo?: string;
  wordmark?: boolean;
  tags: string[];
};

const brands: Brand[] = [
  {
    name: 'Goma Webradio',
    tagline: 'Médias & information',
    description:
      "Site web d'information couplé à une radio en ligne : actualité locale, émissions en streaming direct et podcasts.",
    url: 'https://gomawebradio.com',
    logo: '/assets/goma-webradio-logo.png',
    tags: ['WordPress', 'Radio', 'News', 'Streaming'],
  },
  {
    name: 'Oredy Technologies',
    tagline: 'Technologies & Numérique',
    description:
      "Studio de création web : développement d'applications, sites vitrines, thèmes WordPress premium et accompagnement digital.",
    url: 'https://oredytech.com',
    wordmark: true,
    tags: ['React', 'TypeScript', 'WordPress', 'SEO'],
  },
  {
    name: 'FABROM ICD',
    tagline: 'Industrie, Commerce & Distribution',
    description:
      "Pôle industriel et commercial des Ets FABROM : importation, commerce général et distribution de produits.",
    logo: '/assets/fabrom-icd-logo.png',
    tags: ['Commerce', 'Distribution', 'Industrie'],
  },
];

const projects = [
  {
    title: 'GOWERA',
    description:
      "Plateforme de streaming radio gratuite qui connecte les auditeurs aux stations du monde entier en un clic.",
    url: 'https://gowera.com',
    tags: ['TypeScript', 'Radio API'],
  },
  {
    title: 'Thème WordPress Premium',
    description:
      "Conception et développement d'un thème WordPress pour professionnels : rapide, responsive et optimisé SEO.",
    tags: ['PHP', 'WordPress', 'Design'],
  },
  {
    title: 'Marché de sites web',
    description:
      "Place de marché permettant d'acheter des sites web clés en main, avec paiement Mobile Money intégré.",
    url: '/marketplace',
    tags: ['React', 'Paiement', 'Cloud'],
  },
];

const MesProjets = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          <div className="mb-10">
            <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Retour à l'accueil
            </Link>
            <div className="text-center bg-muted rounded-lg p-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 text-primary">Mes projets</h1>
              <p className="text-muted-foreground">
                Mes marques, pôles d'activités et réalisations personnelles.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-display font-bold mb-6">Mes marques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {brands.map((brand) => (
              <article
                key={brand.name}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-muted flex items-center justify-center p-6">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={`Logo ${brand.name}`}
                      loading="lazy"
                      className="max-h-28 w-auto object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="font-display text-2xl font-black tracking-tight text-primary">OREDY</p>
                      <p className="font-display text-sm font-bold tracking-[0.3em] text-accent">
                        TECHNOLOGIES
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{brand.name}</h3>
                  <p className="text-sm text-accent-foreground/80 mb-3">{brand.tagline}</p>
                  <p className="text-muted-foreground text-sm mb-4">{brand.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {brand.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {brand.url && (
                    <a
                      href={brand.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary hover:underline"
                    >
                      Visiter le site
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold mb-6">Projets personnels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <article key={project.title} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.url && (
                  project.url.startsWith('/') ? (
                    <Link to={project.url} className="text-sm text-primary hover:underline">
                      Découvrir
                    </Link>
                  ) : (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary hover:underline"
                    >
                      Visiter le site
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  )
                )}
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MesProjets;
