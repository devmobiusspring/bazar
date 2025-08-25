import { Shop, Review } from '../types';
import { mockShops, mockReviews } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getShops = async (limit?: number): Promise<Shop[]> => {
  await delay(400);
  return limit ? mockShops.slice(0, limit) : mockShops;
};

export const getShopById = async (id: string): Promise<Shop | null> => {
  await delay(300);
  return mockShops.find(shop => shop.id === id) || null;
};

export const getPopularShops = async (): Promise<Shop[]> => {
  await delay(400);
  return mockShops.sort((a, b) => b.rating - a.rating);
};

export const getShopsByCategory = async (categoryName: string): Promise<Shop[]> => {
  await delay(400);
  return mockShops.filter(shop => 
    shop.categories.includes(categoryName)
  );
};

export const getShopReviews = async (shopId: string): Promise<Review[]> => {
  await delay(300);
  return mockReviews.filter(review => review.shopId === shopId);
};