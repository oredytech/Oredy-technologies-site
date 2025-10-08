import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import oredyPortrait from '@/assets/oredy-portrait.png';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-end md:items-center bg-background overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
      
      {/* Portrait Image - Background on mobile, right side on medium+ */}
      <div className="absolute inset-0 md:relative md:inset-auto md:absolute md:right-0 md:top-0 md:bottom-0 md:w-1/2 lg:w-2/5 flex items-center justify-center md:justify-end">
        <div 
          className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 md:translate-x-0' : 'opacity-0 md:translate-x-12'} w-full h-full md:h-auto flex items-center justify-center md:justify-end md:pr-12 lg:pr-20`}
        >
          <div className="relative md:mt-0">
            {/* Gradient Border Effect - hidden on mobile */}
            <div className="hidden md:block absolute -inset-1 bg-gradient-to-br from-primary/50 via-secondary/50 to-accent/50 rounded-[2rem] blur-sm opacity-40"></div>
            <div className="relative md:bg-background/10 md:backdrop-blur-sm rounded-[2rem] md:p-1.5">
              <div className="relative rounded-[1.8rem] overflow-hidden w-full h-full md:w-[280px] md:h-[380px] lg:w-[360px] lg:h-[480px]">
                <img 
                  src={oredyPortrait}
                  alt="OREDY - Développeur Frontend" 
                  className="w-full h-full object-cover opacity-30 md:opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container relative z-10 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Text Content */}
          <div 
            className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 md:translate-x-0' : 'opacity-0 md:-translate-x-12'} text-center md:text-left flex flex-col items-center md:items-start`}
          >
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
              HELLO THERE, WELCOME TO MY SITE
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
              I'm <span className="text-foreground">OREDY</span>
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              A <span className="text-primary">Développeur Frontend</span>
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
              & UI/UX Designer
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#contact" className="btn btn-primary inline-flex items-center justify-center">
                CONTACT ME
              </a>
              <Link to="/cv" className="btn btn-outline inline-flex items-center justify-center">
                <Download className="mr-2" size={16} />
                DOWNLOAD CV
              </Link>
            </div>
          </div>

          {/* Spacer for medium screens to push content left */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
