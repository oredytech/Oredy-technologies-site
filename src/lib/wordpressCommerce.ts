import { z } from 'zod';

// Public catalog only: no WordPress credentials are sent to the browser.
export const WP_COMMERCE_BASE = (import.meta.env.VITE_WORDPRESS_COMMERCE_URL || 'https://oredytech.com').replace(/\/$/, '');
export const WP_COMMERCE_API = `${WP_COMMERCE_BASE}/wp-json/oredy-commerce/v1`;
const publicUrl = z.string().refine(value => value === '' || /^https?:\/\//i.test(value), 'Lien invalide');
const siteSchema = z.object({
  id: z.coerce.string(), title: z.string(), description: z.string(), short_description: z.string(),
  price: z.number().nonnegative(), currency: z.string(), status: z.enum(['available', 'pending', 'sold']),
  screenshots: z.array(publicUrl), technologies: z.array(z.string()), code_snippets: z.string(),
  demo_url: publicUrl, site_url: publicUrl, purchase_url: publicUrl,
});
const productSchema = z.object({
  id: z.coerce.string(), title: z.string(), description: z.string(), short_description: z.string(),
  price: z.string(), original_price: z.string(), image_url: publicUrl, category: z.string(),
  is_affiliate: z.boolean(), affiliate_url: publicUrl, product_url: publicUrl,
  is_featured: z.boolean(), is_active: z.boolean(),
});
export type CommerceSite = z.infer<typeof siteSchema>;
export type CommerceProduct = z.infer<typeof productSchema>;

async function request(path: string, options?: RequestInit) {
  const response = await fetch(`${WP_COMMERCE_API}${path}`, options);
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || `Le catalogue WordPress est indisponible (${response.status}).`);
  if (data === null) throw new Error('Réponse WordPress invalide.');
  return { data, pages: Number(response.headers.get('X-WP-TotalPages') || 1) };
}

async function collection<T>(path: string, schema: z.ZodType<T>): Promise<T[]> {
  const items: T[] = [];
  let page = 1;
  let pages = 1;
  do {
    const result = await request(`${path}?per_page=100&page=${page}`);
    items.push(...z.array(schema).parse(result.data));
    pages = result.pages;
    page += 1;
  } while (page <= pages);
  return items;
}

export const fetchCommerceSites = () => collection('/sites', siteSchema);
export const fetchCommerceSite = async (id: string) => siteSchema.parse((await request(`/sites/${encodeURIComponent(id)}`)).data);
export const fetchCommerceProducts = async () => (await collection('/products', productSchema)).filter(product => product.is_active);
export const featuredProducts = (products: CommerceProduct[]) => products.filter(product => product.is_active && product.is_featured).slice(0, 3);
export const productLink = (product: CommerceProduct) => product.is_affiliate ? product.affiliate_url : product.product_url;
export const submitCommercePurchase = async (id: string, buyer: { buyer_name: string; buyer_email: string; buyer_phone: string }) => {
  const { data } = await request('/purchases', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ site_id: Number(id), ...buyer }),
  });
  return z.object({ reference: z.string(), message: z.string() }).parse(data);
};