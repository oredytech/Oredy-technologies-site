import { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWordPressBlog } from '@/hooks/useWordPressBlog';
import { useWordPressCategories } from '@/hooks/useWordPressCategories';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { categories } = useWordPressCategories();
  
  // Récupérer le paramètre de catégorie depuis l'URL
  const urlParams = new URLSearchParams(location.search);
  const selectedCategoryId = urlParams.get('category') ? parseInt(urlParams.get('category')!) : null;
  
  const {
    posts,
    totalPages,
    loading,
    error
  } = useWordPressBlog(currentPage, 10, selectedCategoryId);

  // Auto-rotate background images
  useEffect(() => {
    if (posts.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % Math.min(5, posts.length));
    }, 4000);

    return () => clearInterval(interval);
  }, [posts.length]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-20">
        <section className="section relative overflow-hidden">
          {/* Background carousel with images from recent posts */}
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              {posts.slice(0, 5).map((post, index) => {
                const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                if (!image) return null;
                return (
                  <div
                    key={post.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentImageIndex ? 'opacity-15' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover scale-110 animate-fade-in"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background/90"></div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                Blog 
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
                Découvrez nos articles, tutoriels et actualités sur les technologies web, 
                le développement et les tendances du numérique.
              </p>
            </div>

            {loading ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="card animate-pulse">
                    <div className="bg-muted h-48 rounded-lg mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>)}
              </div> : error ? <div className="text-center text-red-400 py-12">
                <p className="text-xl mb-4">Erreur lors du chargement des articles</p>
                <p>{error}</p>
              </div> : <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map(post => <article key={post.id} className="card group hover:transform hover:scale-105">
                      {post._embedded?.['wp:featuredmedia']?.[0] && <Link to={`/blog/${post.slug}`}>
                          <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                            <img src={post._embedded['wp:featuredmedia'][0].source_url || '/placeholder.svg'} alt={stripHtml(post.title.rendered)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                          </div>
                        </Link>}
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(post.date)}
                      </div>
                      
                      <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                        <Link to={`/blog/${post.slug}`} className="hover:text-turquoise transition-colors" dangerouslySetInnerHTML={{
                    __html: post.title.rendered
                  }} />
                      </h2>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {stripHtml(post.excerpt.rendered)}
                      </p>
                      
                      <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-turquoise hover:text-turquoise/80 transition-colors group/link">
                        Lire la suite
                        <ArrowRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </article>)}
                </div>

                {totalPages > 1 && <div className="mt-16">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                        </PaginationItem>
                        
                {(() => {
                    const delta = 2;
                    const range = [];
                    const rangeWithDots = [];
                    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
                      range.push(i);
                    }
                    if (currentPage - delta > 2) {
                      rangeWithDots.push(1, '...');
                    } else {
                      rangeWithDots.push(1);
                    }
                    rangeWithDots.push(...range);
                    if (currentPage + delta < totalPages - 1) {
                      rangeWithDots.push('...', totalPages);
                    } else if (totalPages > 1) {
                      rangeWithDots.push(totalPages);
                    }
                    return rangeWithDots.map((page, index) => <PaginationItem key={index}>
                      {page === '...' ? <span className="flex h-9 w-9 items-center justify-center">...</span> : <PaginationLink onClick={() => handlePageChange(page as number)} isActive={currentPage === page} className="cursor-pointer">
                          {page}
                        </PaginationLink>}
                    </PaginationItem>);
                  })()}
                        
                        <PaginationItem>
                          <PaginationNext onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>}
              </>}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Blog;