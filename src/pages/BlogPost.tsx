import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, MessageCircle, Copy, Check, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWordPressPost } from '@/hooks/useWordPressBlog';
import { useWordPressCategories, useWordPressPostsByCategory } from '@/hooks/useWordPressCategories';
import RelatedArticleCard from '@/components/blog/RelatedArticleCard';
import { Button } from '@/components/ui/button';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, featuredMedia, loading, error } = useWordPressPost(slug || '');
  const { categories } = useWordPressCategories();
  const [linkCopied, setLinkCopied] = useState(false);

  // Récupérer la catégorie principale de l'article
  const postCategoryId = post?.categories?.[0];
  const postCategory = categories.find(cat => cat.id === postCategoryId);
  
  // Récupérer les articles de la même catégorie
  const { posts: relatedPosts } = useWordPressPostsByCategory(postCategoryId || 0, post?.id);

  // Fonction pour injecter les articles liés dans le contenu
  const injectRelatedArticles = (content: string) => {
    if (!relatedPosts.length) return content;

    // Séparer le contenu en paragraphes
    const paragraphs = content.split('</p>');
    const result = [];
    
    let relatedIndex = 0;
    for (let i = 0; i < paragraphs.length; i++) {
      result.push(paragraphs[i]);
      
      // Ajouter un article lié après chaque 2 paragraphes
      if ((i + 1) % 2 === 0 && relatedIndex < relatedPosts.length && i < paragraphs.length - 1) {
        const relatedPost = relatedPosts[relatedIndex];
        const featuredImage = relatedPost._embedded?.['wp:featuredmedia']?.[0];
        
        result.push(`
          <div class="related-article-inline my-8 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <a href="/blog/${relatedPost.slug}" class="flex items-center gap-3 text-decoration-none hover:text-turquoise transition-colors group">
              ${featuredImage ? `
                <div class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                  <img src="${featuredImage.source_url}" alt="${relatedPost.title.rendered}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
              ` : ''}
              <div class="flex-1">
                <p class="text-sm text-turquoise font-medium mb-1">Lire aussi :</p>
                <h4 class="text-sm font-semibold text-white group-hover:text-turquoise transition-colors">${relatedPost.title.rendered}</h4>
              </div>
            </a>
          </div>
        `);
        relatedIndex++;
      }
      
      if (i < paragraphs.length - 1) {
        result.push('</p>');
      }
    }
    
    return result.join('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getArticleUrl = () => {
    return `https://oredytech.com/blog/${slug}`;
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(getArticleUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(getArticleUrl());
    const text = encodeURIComponent(post?.title.rendered || '');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = getArticleUrl();
    const text = encodeURIComponent(`${post?.title.rendered || ''} - ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getArticleUrl());
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-darkGray text-white">
        <Header />
        <main className="pt-20">
          <div className="container section">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-600 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-600 rounded mb-6 w-1/4"></div>
              <div className="h-96 bg-gray-600 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                <div className="h-4 bg-gray-600 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-darkGray text-white">
        <Header />
        <main className="pt-20">
          <div className="container section text-center">
            <h1 className="text-4xl font-bold mb-4 text-red-400">Article non trouvé</h1>
            <p className="text-gray-300 mb-8">{error || 'Cet article n\'existe pas ou a été supprimé.'}</p>
            <Link to="/blog">
              <Button className="btn btn-primary">
                <ArrowLeft className="mr-2" size={16} />
                Retour au blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkGray text-white">
      <Header />
      
      <main className="pt-20">
        <article className="section">
          <div className="container max-w-4xl">
            {/* Navigation */}
            <div className="mb-8">
              <Link 
                to="/blog"
                className="inline-flex items-center text-turquoise hover:text-turquoise/80 transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" />
                Retour au blog
              </Link>
            </div>

            {/* Article Header */}
            <header className="mb-8">
              <h1 
                className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              
              <div className="flex items-center text-gray-400 mb-6">
                <Calendar size={16} className="mr-2" />
                {formatDate(post.date)}
              </div>
            </header>

            {/* Featured Image with Category Badge */}
            {featuredMedia && (
              <div className="mb-8 relative">
                {postCategory && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-turquoise text-darkGray text-sm font-semibold rounded-full">
                      <Tag size={14} />
                      {postCategory.name}
                    </span>
                  </div>
                )}
                <img 
                  src={featuredMedia.source_url}
                  alt={featuredMedia.alt_text || post.title.rendered}
                  className="w-full max-h-96 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="lg:grid lg:grid-cols-4 lg:gap-8">
              <div className="lg:col-span-3">
                <div 
                  className="prose prose-invert prose-xl max-w-none
                    prose-headings:text-white prose-headings:font-bold prose-headings:mb-8 prose-headings:mt-12
                    prose-h1:text-[28px] prose-h1:mb-12 prose-h1:mt-0 prose-h1:leading-tight prose-h1:text-white prose-h1:font-extrabold
                    prose-h2:text-[26px] prose-h2:mb-8 prose-h2:mt-16 prose-h2:text-turquoise prose-h2:font-bold
                    prose-h3:text-[24px] prose-h3:mb-6 prose-h3:mt-12 prose-h3:text-turquoise prose-h3:font-bold prose-h3:leading-snug
                    prose-h4:text-[22px] prose-h4:mb-5 prose-h4:mt-10 prose-h4:text-white prose-h4:font-semibold
                    prose-h5:text-[20px] prose-h5:mb-4 prose-h5:mt-8 prose-h5:text-white prose-h5:font-semibold
                    prose-h6:text-[18px] prose-h6:mb-3 prose-h6:mt-6 prose-h6:text-gray-300 prose-h6:font-medium
                    prose-p:text-gray-300 prose-p:leading-[1.8] prose-p:mb-4 prose-p:mt-0 prose-p:text-[17px] prose-p:text-justify
                    prose-a:text-turquoise prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4 prose-a:decoration-turquoise/60 
                    hover:prose-a:text-white hover:prose-a:decoration-turquoise hover:prose-a:bg-turquoise/10 prose-a:transition-all prose-a:duration-200 
                    prose-a:font-semibold prose-a:px-1 prose-a:py-0.5 prose-a:rounded
                    prose-strong:text-white prose-strong:font-bold prose-strong:text-lg
                    prose-em:text-gray-300 prose-em:italic
                    prose-ul:text-gray-300 prose-ul:mb-6 prose-ul:mt-4 prose-ul:space-y-2 prose-ul:pl-6
                    prose-ol:text-gray-300 prose-ol:mb-6 prose-ol:mt-4 prose-ol:space-y-2 prose-ol:pl-6
                    prose-li:text-gray-300 prose-li:mb-2 prose-li:leading-relaxed
                    prose-blockquote:border-l-4 prose-blockquote:border-l-turquoise prose-blockquote:bg-gradient-to-r prose-blockquote:from-turquoise/10 prose-blockquote:to-transparent
                    prose-blockquote:text-turquoise prose-blockquote:pl-6 prose-blockquote:py-6 prose-blockquote:mb-8 prose-blockquote:mt-6
                    prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:font-medium prose-blockquote:rounded-r-lg prose-blockquote:shadow-lg
                    prose-code:bg-gray-800 prose-code:text-turquoise prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                    prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:p-6 prose-pre:rounded-lg prose-pre:mb-8 prose-pre:mt-6
                    prose-img:rounded-lg prose-img:mb-8 prose-img:mt-6 prose-img:shadow-lg
                    prose-hr:border-gray-700 prose-hr:my-12 prose-hr:border-t-2
                    [&_h1]:text-[28px] [&_h1]:font-extrabold [&_h1]:text-white [&_h1]:mb-8 [&_h1]:mt-12 [&_h1]:leading-tight
                    [&_h2]:text-[26px] [&_h2]:font-bold [&_h2]:text-turquoise [&_h2]:mb-6 [&_h2]:mt-12
                    [&_h3]:text-[24px] [&_h3]:font-bold [&_h3]:text-turquoise [&_h3]:mb-5 [&_h3]:mt-10 [&_h3]:leading-snug
                    [&_h4]:text-[22px] [&_h4]:font-semibold [&_h4]:text-white [&_h4]:mb-4 [&_h4]:mt-8
                    [&_h5]:text-[20px] [&_h5]:font-semibold [&_h5]:text-white [&_h5]:mb-3 [&_h5]:mt-6
                    [&_h6]:text-[18px] [&_h6]:font-medium [&_h6]:text-gray-300 [&_h6]:mb-3 [&_h6]:mt-5
                    [&_.related-article-inline]:not-prose [&_.related-article-inline_*]:m-0"
                  dangerouslySetInnerHTML={{ __html: injectRelatedArticles(post.content.rendered) }}
                />

                {/* Social Sharing */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Partager cet article</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={shareOnFacebook}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Facebook size={16} />
                      Facebook
                    </Button>
                    <Button
                      onClick={shareOnTwitter}
                      className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white"
                    >
                      <Twitter size={16} />
                      Twitter
                    </Button>
                    <Button
                      onClick={shareOnWhatsApp}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </Button>
                    <Button
                      onClick={copyLink}
                      className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white"
                    >
                      {linkCopied ? <Check size={16} /> : <Copy size={16} />}
                      {linkCopied ? 'Copié!' : 'Copier le lien'}
                    </Button>
                  </div>
                </div>

                {/* Comments Form */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                  <h3 className="text-2xl font-semibold mb-6">Laisser un commentaire</h3>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Nom *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium mb-2">
                        Commentaire *
                      </label>
                      <textarea
                        id="comment"
                        rows={5}
                        required
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent"
                        placeholder="Partagez vos pensées..."
                      ></textarea>
                    </div>
                    <Button type="submit" className="btn btn-primary">
                      Publier le commentaire
                    </Button>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1 mt-12 lg:mt-0 space-y-6">
                {/* Categories */}
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Catégories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/blog?category=${category.id}`}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          category.id === postCategoryId
                            ? 'bg-turquoise text-darkGray font-semibold'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {category.name} ({category.count})
                      </Link>
                    ))}
                  </div>
                </div>

                {/* À propos d'OREDY */}
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">À propos d'OREDY</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    OREDY Technologies est une agence spécialisée dans le développement web, 
                    le design et les solutions digitales innovantes.
                  </p>
                  <Link to="/contact">
                    <Button className="btn btn-outline w-full">
                      Nous contacter
                    </Button>
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;