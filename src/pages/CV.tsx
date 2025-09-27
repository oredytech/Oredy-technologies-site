
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PersonalInfo from '@/components/cv/PersonalInfo';
import Skills from '@/components/cv/Skills';
import Languages from '@/components/cv/Languages';
import Experience from '@/components/cv/Experience';
import Education from '@/components/cv/Education';
import Certifications from '@/components/cv/Certifications';
import Projects from '@/components/cv/Projects';

const CV = () => {
  return (
    <div className="min-h-screen bg-darkGray text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          <div className="mb-10">
            <Link to="/" className="inline-flex items-center text-turquoise hover:underline mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Retour à l'accueil
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Mon Curriculum Vitae</h1>
            <p className="text-gray-400 mb-8">Découvrez mon parcours professionnel et mes compétences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Colonne gauche: Informations personnelles et compétences */}
            <div className="md:col-span-1 space-y-8">
              <PersonalInfo />
              <Skills />
              <Languages />
            </div>
            
            {/* Colonne droite: Expérience et formation */}
            <div className="md:col-span-2 space-y-8">
              <Experience />
              <Education />
              <Certifications />
              <Projects />
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="/assets/OREDY_CV.pdf" 
              download="OREDY_MUSANDA_CV.pdf"
              className="btn btn-primary inline-flex items-center justify-center"
            >
              <Download className="mr-2" size={18} />
              Télécharger le CV (PDF)
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CV;
