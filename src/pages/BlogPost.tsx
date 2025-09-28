import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, MessageCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWordPressPost } from '@/hooks/useWordPressBlog';
import { Button } from '@/components/ui/button';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, featuredMedia, loading, error } = useWordPressPost(slug || '');
  const [linkCopied, setLinkCopied] = useState(false);

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

            {/* Featured Image */}
            {featuredMedia && (
              <div className="mb-8">
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
                    prose-headings:text-white prose-headings:font-bold prose-headings:mb-12 prose-headings:mt-20
                    prose-h1:text-6xl prose-h1:mb-16 prose-h1:mt-0 prose-h1:leading-tight prose-h1:text-white prose-h1:font-extrabold
                    prose-h2:text-5xl prose-h2:mb-14 prose-h2:mt-20 prose-h2:border-b-2 prose-h2:border-turquoise/40 prose-h2:pb-6 prose-h2:text-turquoise prose-h2:font-bold
                    prose-h3:text-4xl prose-h3:mb-12 prose-h3:mt-18 prose-h3:text-turquoise prose-h3:font-bold prose-h3:bg-turquoise/5 prose-h3:px-4 prose-h3:py-2 prose-h3:rounded-lg
                    prose-h4:text-2xl prose-h4:mb-8 prose-h4:mt-14 prose-h4:text-turquoise/90 prose-h4:font-semibold
                    prose-h5:text-xl prose-h5:mb-6 prose-h5:mt-12 prose-h5:text-white prose-h5:font-semibold
                    prose-h6:text-lg prose-h6:mb-5 prose-h6:mt-10 prose-h6:text-gray-300 prose-h6:font-medium
                    prose-p:text-gray-300 prose-p:leading-[1.8] prose-p:mb-10 prose-p:mt-0 prose-p:text-[18px] prose-p:text-justify
                    prose-a:text-turquoise prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4 prose-a:decoration-turquoise/60 
                    hover:prose-a:text-white hover:prose-a:decoration-turquoise hover:prose-a:bg-turquoise/10 prose-a:transition-all prose-a:duration-200 
                    prose-a:font-semibold prose-a:px-1 prose-a:py-0.5 prose-a:rounded
                    prose-strong:text-white prose-strong:font-bold
                    prose-em:text-gray-300 prose-em:italic
                    prose-ul:text-gray-300 prose-ul:mb-10 prose-ul:mt-8 prose-ul:space-y-4 prose-ul:pl-6
                    prose-ol:text-gray-300 prose-ol:mb-10 prose-ol:mt-8 prose-ol:space-y-4 prose-ol:pl-6
                    prose-li:text-gray-300 prose-li:mb-3 prose-li:leading-relaxed
                    prose-blockquote:border-l-4 prose-blockquote:border-l-turquoise prose-blockquote:bg-gray-800/50 
                    prose-blockquote:text-gray-200 prose-blockquote:pl-8 prose-blockquote:py-8 prose-blockquote:mb-12 prose-blockquote:mt-10
                    prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:font-medium prose-blockquote:rounded-r-lg
                    prose-blockquote:shadow-lg prose-blockquote:mx-4
                    prose-code:bg-gray-800 prose-code:text-turquoise prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                    prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:p-6 prose-pre:rounded-lg prose-pre:mb-10 prose-pre:mt-8
                    prose-img:rounded-lg prose-img:mb-10 prose-img:mt-8 prose-img:shadow-lg
                    prose-hr:border-gray-700 prose-hr:my-16 prose-hr:border-t-2
                    [&>*]:mb-6 [&>p+p]:mt-8"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
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
              <aside className="lg:col-span-1 mt-12 lg:mt-0">
                <div className="card sticky top-24">
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