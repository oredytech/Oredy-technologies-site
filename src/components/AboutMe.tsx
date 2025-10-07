
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutMe = () => {
  return (
    <section id="about" className="section bg-mediumGray">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden border-glow animate-glow">
              <div className="aspect-square bg-darkGray relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full p-4">
                    <div className="w-full h-full relative overflow-hidden rounded-lg border-2 border-turquoise/30">
                      <img 
                        src="/lovable-uploads/cf0c9765-b0b7-401c-95ef-ca0fe62ee39d.png" 
                        alt="OREDY" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-darkGray/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <div className="w-12 h-12 bg-turquoise/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4">
                          <div className="w-8 h-8 bg-turquoise rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">
              A propos de <span className="text-turquoise">Moi</span>
            </h2>
            <h3 className="text-xl mb-6">Qui suis-je ?</h3>
            <p className="text-gray-300 mb-6">
              Si nous sommes le reflet de ce que nous créons, alors je suis les touches du clavier qui capturent mes pensées, les écrans qui éclairent mes idées. Chaque fonction, chaque balise, chaque style que j'écris n'est pas simplement du code, mais une extension de moi-même, une manière de transformer une vision en réalité numérique.
            </p>
            <Link to="/about" className="btn btn-outline inline-flex items-center">
              Lire Plus <ChevronRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
