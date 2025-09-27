
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const AboutMePage = () => {
  return (
    <div className="min-h-screen bg-darkGray text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Link to="/" className="inline-flex items-center text-turquoise mb-8 hover:underline">
            <ChevronLeft className="mr-2" size={20} />
            Retour à l'accueil
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            A propos de <span className="text-turquoise">Moi</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <div className="relative rounded-lg overflow-hidden border-glow">
                  <div className="aspect-square bg-mediumGray relative">
                    <img 
                      src="/lovable-uploads/cf0c9765-b0b7-401c-95ef-ca0fe62ee39d.png" 
                      alt="OREDY" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-darkGray/80 to-transparent"></div>
                  </div>
                </div>
                
                <div className="mt-8 bg-mediumGray p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Contactez-moi</h3>
                  <div className="space-y-3">
                    <p className="flex items-center">
                      <span className="w-24 text-gray-400">Email:</span>
                      <a href="mailto:contact@oredy.com" className="text-turquoise hover:underline">contact@oredytech.com</a>
                    </p>
                    <p className="flex items-center">
                      <span className="w-24 text-gray-400">Téléphone:</span>
                      <a href="tel:+243851006476" className="text-turquoise hover:underline">+243 851 006 476</a>
                    </p>
                    <p className="flex items-center">
                      <span className="w-24 text-gray-400">Linkedin:</span>
                      <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:underline">@oredy-musanda</a>
                    </p>
                    <p className="flex items-center">
                      <span className="w-24 text-gray-400">GitHub:</span>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-turquoise hover:underline">@oredytech</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-10">
              <section>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-turquoise/30">Qui suis-je?</h2>
                <p className="text-gray-300 mb-4">
                  Si nous sommes le reflet de ce que nous créons, alors je suis les touches du clavier qui capturent mes pensées, les écrans qui éclairent mes idées. Chaque fonction, chaque balise, chaque style que j'écris n'est pas simplement du code, mais une extension de moi-même, une manière de transformer une vision en réalité numérique.
                </p>
                <p className="text-gray-300 mb-4">
                  Je suis un développeur web passionné, spécialisé dans la création d'expériences web immersives et fonctionnelles. Avec plusieurs années d'expérience dans le développement web et la conception d'interfaces utilisateur, j'ai appris à transformer des idées complexes en solutions élégantes et accessibles.
                </p>
                <p className="text-gray-300">
                  Ma philosophie est simple : la technologie doit servir l'humain, pas l'inverse. C'est pourquoi je m'efforce de créer des sites web et des applications qui sont non seulement esthétiquement plaisants, mais aussi intuitifs et accessibles pour tous les utilisateurs.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-turquoise/30">Compétences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl mb-3">Développement</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-turquoise rounded-full mr-2"></span>
                        JavaScript / TypeScript
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-turquoise rounded-full mr-2"></span>
                        React, Vue, Angular
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-turquoise rounded-full mr-2"></span>
                        Node.js, Express
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-turquoise rounded-full mr-2"></span>
                        PHP, WordPress
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-turquoise rounded-full mr-2"></span>
                        HTML5, CSS3, SASS
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl mb-3">Design</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-turquoise rounded-full mr-2"></span>
                        Figma, Adobe XD
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-turquoise rounded-full mr-2"></span>
                        Photoshop, Illustrator
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-turquoise rounded-full mr-2"></span>
                        UI/UX Design
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-turquoise rounded-full mr-2"></span>
                        Responsive Design
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-turquoise rounded-full mr-2"></span>
                        Design System
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-turquoise/30">Mon approche</h2>
                <p className="text-gray-300 mb-4">
                  Je crois fermement que le succès d'un projet web réside dans l'équilibre entre une esthétique attrayante et une fonctionnalité solide. Chaque ligne de code que j'écris, chaque pixel que je place, est pensé pour offrir une expérience utilisateur optimale.
                </p>
                <p className="text-gray-300 mb-4">
                  Ma méthodologie de travail est basée sur l'écoute active des besoins clients, la recherche approfondie, et l'itération constante. Je m'adapte rapidement aux nouvelles technologies et tendances du web, tout en maintenant une attention particulière aux bonnes pratiques et aux standards de l'industrie.
                </p>
                <p className="text-gray-300">
                  Je valorise la communication transparente et régulière avec mes clients, car je crois que c'est la clé d'une collaboration réussie et de la livraison d'un produit qui dépasse les attentes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-turquoise/30">Parcours</h2>
                <div className="space-y-6">
                  <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-turquoise/30">
                    <span className="absolute left-0 top-1 w-2 h-2 bg-turquoise rounded-full -translate-x-1/2"></span>
                    <h3 className="text-xl font-bold">2023 - Présent</h3>
                    <p className="text-turquoise">Freelance Developer & Designer</p>
                    <p className="text-gray-300 mt-2">
                      Création de sites web et d'applications pour divers clients, de la conception à la mise en production.
                    </p>
                  </div>
                  
                  <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-turquoise/30">
                    <span className="absolute left-0 top-1 w-2 h-2 bg-turquoise rounded-full -translate-x-1/2"></span>
                    <h3 className="text-xl font-bold">2022 - 2024</h3>
                    <p className="text-turquoise">Créateur & Gestionnaire</p>
                    <p className="text-gray-300 mt-2">
                      Rédacteur, Webmaster et Développeur du site radiotayna.com.
                    </p>
                  </div>
                  
                  <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-turquoise/30">
                    <span className="absolute left-0 top-1 w-2 h-2 bg-turquoise rounded-full -translate-x-1/2"></span>
                    <h3 className="text-xl font-bold">2018 - 2020</h3>
                    <p className="text-turquoise">Rédacteur Web & Blogueur</p>
                    <p className="text-gray-300 mt-2">
                      Passionné du Web, Rédacteur & Créateur de Contenu
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutMePage;
