// Core data models for the marketplace
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  addresses: Address[];
  favoriteProducts: string[];
  favoriteShops: string[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  department: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  condition: 'new' | 'used' | 'refurbished';
  shopId: string;
  rating: number;
  reviewCount: number;
  stock: number;
  shipping: {
    free: boolean;
    cost?: number;
    estimatedDays: string;
  };
  specifications?: Record<string, string>;
  tags: string[];
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  avatar: string;
  banner?: string;
  rating: number;
  reviewCount: number;
  location: string;
  joinedDate: string;
  policies: {
    returns: string;
    shipping: string;
    warranty: string;
  };
  categories: string[];
  isVerified: boolean;
  responseTime: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: Category[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  escrowStatus: 'pending' | 'released' | 'disputed' | 'refunded';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  variant?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId?: string;
  shopId?: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  helpful: number;
}

export interface SearchResult {
  products: Product[];
  shops: Shop[];
  categories: Category[];
  total: number;
}