import { Category } from '../types';
import { mockCategories } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCategories = async (): Promise<Category[]> => {
  await delay(200);
  return mockCategories;
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
  await delay(100);
  return mockCategories.find(category => category.id === id) || null;
};