import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useWordPressBlog } from '@/hooks/useWordPressBlog';

const BlogSection = () => {
  const { posts, loading, error } = useWordPressBlog(1, 3);

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

  if (loading) {
    return (
      <section className="section bg-darkGray" id="blog">
        <div className="container">
          <h2 className="section-title text-center">Blog</h2>
          <p className="text-center text-gray-300 mb-12">
            Découvrez nos derniers articles et actualités
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-600 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-600 rounded mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section bg-darkGray" id="blog">
        <div className="container">
          <h2 className="section-title text-center">Blog</h2>
          <div className="text-center text-red-400">
            Erreur lors du chargement des articles: {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-darkGray" id="blog">
      <div className="container">
        <h2 className="section-title text-center">Blog</h2>
        <p className="text-center text-gray-300 mb-12">
          Découvrez nos derniers articles et actualités
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <article key={post.id} className="card group hover:transform hover:scale-105">
              {post._links['wp:featuredmedia'] && (
                <div className="aspect-video bg-gray-700 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={post._links['wp:featuredmedia'][0]?.href || '/placeholder.svg'}
                    alt={stripHtml(post.title.rendered)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              )}
              
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <Calendar size={14} className="mr-1" />
                {formatDate(post.date)}
              </div>
              
              <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                <Link 
                  to={`/blog/${post.slug}`}
                  className="hover:text-turquoise transition-colors"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </h3>
              
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
        
        <div className="text-center mt-12">
          <Link 
            to="/blog"
            className="btn btn-outline"
          >
            Voir tous les articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;