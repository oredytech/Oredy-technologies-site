import { describe, test } from 'node:test';
import { strict as assert } from 'node:assert';
import { featuredProducts, productLink, type CommerceProduct } from './wordpressCommerce';

const product = (overrides: Partial<CommerceProduct> = {}): CommerceProduct => ({
  id: '1', title: 'Produit', description: '', short_description: '', price: '20 USD', original_price: '',
  image_url: '', category: '', is_affiliate: false, affiliate_url: '', product_url: 'https://facelect.com',
  is_featured: true, is_active: true, ...overrides,
});
describe('catalogue WordPress', () => {
  test('les produits affiliés utilisent le lien affilié, pas le lien du produit', () => {
    assert.equal(productLink(product({ is_affiliate: true, affiliate_url: 'https://example.com/?ref=oredy' })), 'https://example.com/?ref=oredy');
  });
  test('les produits directs utilisent le lien du produit', () => {
    assert.equal(productLink(product()), 'https://facelect.com');
  });
  test('les recommandations excluent les produits inactifs et non mis en avant', () => {
    assert.deepEqual(featuredProducts([product(), product({ id: '2', is_active: false }), product({ id: '3', is_featured: false })]).map(p => p.id), ['1']);
  });
});