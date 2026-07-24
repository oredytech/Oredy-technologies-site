import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import portraitAsset from '@/assets/oredy-hero-illustration.webp.asset.json';
const portrait = portraitAsset.url;

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-end bg-background overflow-hidden pt-24 pb-0">
      {/* Decorative yellow circles */}
      <div className="deco-circle w-[520px] h-[520px] right-[-80px] top-[10%] opacity-95 hidden md:block" />
      <div className="deco-circle w-[160px] h-[160px] right-[42%] bottom-[8%] hidden md:block" />
      <div className="deco-circle w-[280px] h-[280px] right-[-120px] bottom-[-100px] hidden md:block" />
      <div className="deco-circle w-[300px] h-[300px] right-[-60px] top-[15%] md:hidden" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div
            className={`transition-all duration-1000 delay-200 text-center md:text-left ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-primary mb-6">
              Bienvenue sur<br />mon portfolio
            </h1>
            <p className="text-lg text-foreground/80 mb-8 max-w-xl mx-auto md:mx-0">
              Je suis <span className="font-semibold">Oredy Musanda</span>, développeur web et web designer.
              Je crée des sites web modernes, responsives et adaptés aux besoins des organisations,
              entreprises et projets numériques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/development" className="btn btn-primary inline-flex items-center justify-center">
                Voir mes projets
              </Link>
              <Link to="/cv" className="btn btn-outline inline-flex items-center justify-center">
                <Download className="mr-2" size={16} />
                Voir mon CV
              </Link>
            </div>
          </div>

          <div
            className={`relative flex justify-center md:justify-end items-end self-end transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <img
              src={portrait}
              alt="Oredy Musanda"
              className="relative z-10 max-h-[80vh] w-auto object-contain drop-shadow-2xl -scale-x-100 mb-0"
              style={{ marginBottom: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
