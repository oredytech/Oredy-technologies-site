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
    <section id="home" className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
      
      <div className="container relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div 
            className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
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
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn btn-primary inline-flex items-center justify-center">
                CONTACT ME
              </a>
              <Link to="/cv" className="btn btn-outline inline-flex items-center justify-center">
                <Download className="mr-2" size={16} />
                DOWNLOAD CV
              </Link>
            </div>
          </div>

          {/* Right Side - Portrait */}
          <div 
            className={`flex justify-center lg:justify-end transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            <div className="relative">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary via-secondary to-accent rounded-[2rem] blur-sm opacity-75"></div>
              <div className="relative bg-background rounded-[2rem] p-1.5">
                <div className="relative rounded-[1.8rem] overflow-hidden w-[280px] h-[380px] md:w-[320px] md:h-[440px] lg:w-[360px] lg:h-[480px]">
                  <img 
                    src={oredyPortrait}
                    alt="OREDY - Développeur Frontend" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
