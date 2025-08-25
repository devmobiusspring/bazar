import { CartItem, Product } from '../types';
import { getProductById } from './productService';

const CART_STORAGE_KEY = 'bazarDigitalCart';

export const getCartItems = (): CartItem[] => {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addToCart = (productId: string, quantity: number = 1): void => {
  const items = getCartItems();
  const existingIndex = items.findIndex(item => item.productId === productId);
  
  if (existingIndex >= 0) {
    items[existingIndex].quantity += quantity;
  } else {
    items.push({ productId, quantity });
  }
  
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const updateCartItemQuantity = (productId: string, quantity: number): void => {
  const items = getCartItems();
  const index = items.findIndex(item => item.productId === productId);
  
  if (index >= 0) {
    if (quantity <= 0) {
      items.splice(index, 1);
    } else {
      items[index].quantity = quantity;
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }
};

export const removeFromCart = (productId: string): void => {
  const items = getCartItems().filter(item => item.productId !== productId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
};

export const getCartTotal = async (): Promise<{ subtotal: number; shipping: number; total: number }> => {
  const items = getCartItems();
  let subtotal = 0;
  let shipping = 0;
  
  for (const item of items) {
    const product = await getProductById(item.productId);
    if (product) {
      subtotal += product.price * item.quantity;
      if (!product.shipping.free && product.shipping.cost) {
        shipping += product.shipping.cost;
      }
    }
  }
  
  return {
    subtotal,
    shipping,
    total: subtotal + shipping
  };
};

export const getCartItemCount = (): number => {
  return getCartItems().reduce((total, item) => total + item.quantity, 0);
};