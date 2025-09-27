import { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWordPressBlog } from '@/hooks/useWordPressBlog';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, totalPages, loading, error } = useWordPressBlog(currentPage, 10);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-darkGray text-white">
      <Header />
      
      <main className="pt-20">
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Blog <span className="text-turquoise">OREDY</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Découvrez nos articles, tutoriels et actualités sur les technologies web, 
                le développement et les tendances du numérique.
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="bg-gray-600 h-48 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-600 rounded mb-2"></div>
                    <div className="h-3 bg-gray-600 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-red-400 py-12">
                <p className="text-xl mb-4">Erreur lors du chargement des articles</p>
                <p>{error}</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <article key={post.id} className="card group hover:transform hover:scale-105">
                      {post._links['wp:featuredmedia'] && (
                        <Link to={`/blog/${post.slug}`}>
                          <div className="aspect-video bg-gray-700 rounded-lg mb-4 overflow-hidden">
                            <img 
                              src={post._links['wp:featuredmedia'][0]?.href || '/placeholder.svg'}
                              alt={stripHtml(post.title.rendered)}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        </Link>
                      )}
                      
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(post.date)}
                      </div>
                      
                      <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="hover:text-turquoise transition-colors"
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                      </h2>
                      
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {stripHtml(post.excerpt.rendered)}
                      </p>
                      
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center text-turquoise hover:text-turquoise/80 transition-colors group/link"
                      >
                        Lire la suite
                        <ArrowRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </article>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-16">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
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
                  
                  return rangeWithDots.map((page, index) => (
                    <PaginationItem key={index}>
                      {page === '...' ? (
                        <span className="flex h-9 w-9 items-center justify-center">...</span>
                      ) : (
                        <PaginationLink
                          onClick={() => handlePageChange(page as number)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ));
                })()}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                            className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;