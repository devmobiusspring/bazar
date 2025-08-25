import { User, Order, Address } from '../types';
import { mockUser, mockOrders } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCurrentUser = async (): Promise<User> => {
  await delay(200);
  return mockUser;
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  await delay(400);
  return mockOrders.filter(order => order.userId === userId);
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  await delay(300);
  return mockOrders.find(order => order.id === orderId) || null;
};

export const updateUserProfile = async (updates: Partial<User>): Promise<User> => {
  await delay(500);
  // In a real app, this would make an API call
  return { ...mockUser, ...updates };
};

export const addUserAddress = async (address: Omit<Address, 'id'>): Promise<Address> => {
  await delay(400);
  const newAddress: Address = {
    ...address,
    id: Date.now().toString()
  };
  return newAddress;
};

export const updateUserAddress = async (addressId: string, updates: Partial<Address>): Promise<Address> => {
  await delay(400);
  const address = mockUser.addresses.find(addr => addr.id === addressId);
  if (!address) throw new Error('Address not found');
  return { ...address, ...updates };
};

export const deleteUserAddress = async (addressId: string): Promise<void> => {
  await delay(300);
  // In a real app, this would make an API call
};

export const getFavoriteProducts = async (userId: string): Promise<string[]> => {
  await delay(200);
  return mockUser.favoriteProducts;
};

export const toggleFavoriteProduct = async (userId: string, productId: string): Promise<boolean> => {
  await delay(300);
  const favorites = mockUser.favoriteProducts;
  const index = favorites.indexOf(productId);
  
  if (index >= 0) {
    favorites.splice(index, 1);
    return false;
  } else {
    favorites.push(productId);
    return true;
  }
};