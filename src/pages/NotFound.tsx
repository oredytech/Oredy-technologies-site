import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-darkGray text-white">
      <Header />
      <main className="pt-20">
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 text-turquoise">404</h1>
            <p className="text-xl text-gray-300 mb-8">Oops! Page not found</p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-turquoise text-darkGray font-semibold rounded-lg hover:bg-turquoise/90 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
