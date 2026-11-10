import { ArrowLeft, ExternalLink, FileText, Github, Smartphone, Store } from 'lucide-react';
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

type Project = {
  title: string;
  description: string;
  url?: string;
  logo?: string;
  icon?: 'file' | 'store';
  tags: string[];
  status?: string;
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

const projects: Project[] = [
  {
    title: 'FACELECT',
    description:
      'Outil de facturation électronique pour gérer les factures, les dépenses et les clients, avec un fonctionnement hors ligne et plusieurs devises.',
    url: 'https://facelect.com',
    logo: '/assets/facelect-logo.png',
    tags: ['Facturation', 'Hors ligne', 'Multi-devises'],
  },
  {
    title: 'GOWERA',
    description:
      "Plateforme de streaming radio gratuite qui connecte les auditeurs aux stations du monde entier en un clic.",
    url: 'https://gowera.com',
    logo: '/assets/gowera-logo.png',
    tags: ['TypeScript', 'Radio API'],
  },
  {
    title: 'Oredy SPA Loader',
    description:
      'Outil qui charge et lance vos applications monopages (SPA) depuis une seule adresse : ouverture, préchargement et navigation rapide.',
    url: 'https://oredytech.com/oredy-spa-loader/index.html',
    logo: '/assets/oredy-spa-loader-logo.png',
    tags: ['JavaScript', 'SPA', 'Outil en ligne'],
  },
  {
    title: 'HARIRI Docs',
    description:
      'Outil de modification des PDF : éditer, annoter et préparer vos documents directement dans le navigateur.',
    url: 'https://hariridocs.com',
    icon: 'file',
    tags: ['PDF', 'Édition', 'Navigateur'],
    status: 'En cours de développement',
  },
  {
    title: 'Marché de sites web',
    description:
      "Place de marché permettant d'acheter des sites web clés en main, avec paiement Mobile Money intégré.",
    url: '/marketplace',
    icon: 'store',
    tags: ['React', 'Paiement', 'Cloud'],
  },
];

const ProjectLogo = ({ project }: { project: Project }) => (
  <div className="h-32 bg-white border border-border rounded-lg flex items-center justify-center p-4 mb-4">
    {project.logo ? (
      <img
        src={project.logo}
        alt={`Logo ${project.title}`}
        loading="lazy"
        className="max-h-24 max-w-full object-contain"
      />
    ) : project.icon === 'store' ? (
      <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center text-primary">
        <Store size={32} />
      </div>
    ) : (
      <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center text-primary">
        <FileText size={32} />
      </div>
    )}
  </div>
);

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
              <article
                key={project.title}
                className="bg-card border border-border rounded-lg p-6 flex flex-col"
              >
                <ProjectLogo project={project} />
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  {project.status && (
                    <span className="text-[11px] font-medium bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.url &&
                  (project.url.startsWith('/') ? (
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
                  ))}
              </article>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold mb-6 mt-16">Codes sources & applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://github.com/oredytech/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 flex items-start gap-4 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Github size={26} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">GitHub — Oredy Technologies</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Explorez les codes sources de mes sites web et applications : projets open source, thèmes et expérimentations.
                </p>
                <span className="inline-flex items-center text-sm text-primary hover:underline">
                  Voir les dépôts
                  <ExternalLink size={14} className="ml-1" />
                </span>
              </div>
            </a>

            <a
              href="https://play.google.com/store/apps/dev?id=7816224299438864443"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 flex items-start gap-4 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Smartphone size={26} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Google Play — Applications Android</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Téléchargez mes applications mobiles Android publiées sur le Google Play Store.
                </p>
                <span className="inline-flex items-center text-sm text-primary hover:underline">
                  Voir les applications
                  <ExternalLink size={14} className="ml-1" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MesProjets;
