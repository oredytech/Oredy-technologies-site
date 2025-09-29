import { Link } from 'react-router-dom';

interface RelatedArticleCardProps {
  post: {
    id: number;
    slug: string;
    title: { rendered: string };
    _embedded?: {
      'wp:featuredmedia'?: Array<{
        source_url: string;
        alt_text: string;
      }>;
    };
  };
}

const RelatedArticleCard = ({ post }: RelatedArticleCardProps) => {
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];

  return (
    <Link 
      to={`/blog/${post.slug}`}
      className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-turquoise/50 transition-colors group mb-6"
    >
      {featuredImage && (
        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
          <img
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || stripHtml(post.title.rendered)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-turquoise font-medium mb-1">Lire aussi :</p>
        <h4 
          className="text-sm font-semibold text-white line-clamp-2 group-hover:text-turquoise transition-colors"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </div>
    </Link>
  );
};

export default RelatedArticleCard;