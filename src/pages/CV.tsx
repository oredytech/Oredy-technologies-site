import { useRef, useState } from 'react';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
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
  const cvRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!cvRef.current || isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { default: jsPDF } = await import('jspdf');
      
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#1a1a2e'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('OREDY_MUSANDA_CV.pdf');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

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

          <div ref={cvRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-darkGray p-4">
            <div className="md:col-span-1 space-y-8">
              <PersonalInfo />
              <Skills />
              <Languages />
            </div>
            
            <div className="md:col-span-2 space-y-8">
              <Experience />
              <Education />
              <Certifications />
              <Projects />
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="btn btn-primary inline-flex items-center justify-center disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={18} />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Download className="mr-2" size={18} />
                  Télécharger le CV (PDF)
                </>
              )}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CV;
