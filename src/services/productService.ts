import { Product, SearchResult } from '../types';
import { mockProducts, mockShops, mockCategories } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async (limit?: number): Promise<Product[]> => {
  await delay(500);
  return limit ? mockProducts.slice(0, limit) : mockProducts;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  await delay(300);
  return mockProducts.find(product => product.id === id) || null;
};

export const getProductsByCategory = async (categoryId: string, limit?: number): Promise<Product[]> => {
  await delay(400);
  const categoryName = mockCategories.find(cat => cat.id === categoryId)?.name;
  const filtered = mockProducts.filter(product => product.category === categoryName);
  return limit ? filtered.slice(0, limit) : filtered;
};

export const getProductsByShop = async (shopId: string): Promise<Product[]> => {
  await delay(400);
  return mockProducts.filter(product => product.shopId === shopId);
};

export const getRecentlyViewed = async (): Promise<Product[]> => {
  await delay(200);
  // Simulate recently viewed products from localStorage
  const recentIds = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  return mockProducts.filter(product => recentIds.includes(product.id)).slice(0, 10);
};

export const getRecommendedProducts = async (productId?: string): Promise<Product[]> => {
  await delay(300);
  if (productId) {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      // Return products from same category
      return mockProducts
        .filter(p => p.id !== productId && p.category === product.category)
        .slice(0, 6);
    }
  }
  // Return random products
  return mockProducts.slice(0, 6);
};

export const searchProducts = async (query: string, page = 1, limit = 20): Promise<SearchResult> => {
  await delay(600);
  
  const lowerQuery = query.toLowerCase();
  
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    product.brand?.toLowerCase().includes(lowerQuery)
  );

  const filteredShops = mockShops.filter(shop =>
    shop.name.toLowerCase().includes(lowerQuery) ||
    shop.description.toLowerCase().includes(lowerQuery)
  );

  const filteredCategories = mockCategories.filter(category =>
    category.name.toLowerCase().includes(lowerQuery)
  );

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    products: filteredProducts.slice(startIndex, endIndex),
    shops: filteredShops,
    categories: filteredCategories,
    total: filteredProducts.length
  };
};

export const addToRecentlyViewed = (productId: string): void => {
  const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  const filtered = recent.filter((id: string) => id !== productId);
  const updated = [productId, ...filtered].slice(0, 20);
  localStorage.setItem('recentlyViewed', JSON.stringify(updated));
};