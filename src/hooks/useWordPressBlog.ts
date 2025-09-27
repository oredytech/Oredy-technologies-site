import { useState, useEffect } from 'react';
import { WordPressPost, WordPressMedia } from '@/types/wordpress';

const WP_API_BASE = 'https://totalementactus.net/wp-json/wp/v2';

export const useWordPressBlog = (page: number = 1, perPage: number = 10) => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `${WP_API_BASE}/posts?page=${page}&per_page=${perPage}&_embed=wp:featuredmedia`
        );
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des articles');
        }
        
        const postsData = await response.json();
        const total = response.headers.get('X-WP-Total');
        const totalPagesHeader = response.headers.get('X-WP-TotalPages');
        
        setPosts(postsData);
        setTotalPosts(total ? parseInt(total) : 0);
        setTotalPages(totalPagesHeader ? parseInt(totalPagesHeader) : 0);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, perPage]);

  return { posts, totalPages, totalPosts, loading, error };
};

export const useWordPressPost = (slug: string) => {
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [featuredMedia, setFeaturedMedia] = useState<WordPressMedia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${WP_API_BASE}/posts?slug=${slug}&_embed=wp:featuredmedia`);
        
        if (!response.ok) {
          throw new Error('Article non trouvé');
        }
        
        const postsData = await response.json();
        
        if (postsData.length === 0) {
          throw new Error('Article non trouvé');
        }
        
        const postData = postsData[0];
        setPost(postData);
        
        // Récupérer l'image mise en avant si elle existe
        if (postData.featured_media) {
          const mediaResponse = await fetch(`${WP_API_BASE}/media/${postData.featured_media}`);
          if (mediaResponse.ok) {
            const mediaData = await mediaResponse.json();
            setFeaturedMedia(mediaData);
          }
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { post, featuredMedia, loading, error };
};
