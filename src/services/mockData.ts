import { User, Product, Shop, Category, Order, Review, Address } from '../types';

// Mock image URLs from Pexels
const PRODUCT_IMAGES = [
  'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1598300/pexels-photo-1598300.jpeg?auto=compress&cs=tinysrgb&w=400',
];

const SHOP_AVATARS = [
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Electrónicos', icon: '📱' },
  { id: '2', name: 'Ropa', icon: '👕' },
  { id: '3', name: 'Hogar', icon: '🏠' },
  { id: '4', name: 'Deportes', icon: '⚽' },
  { id: '5', name: 'Libros', icon: '📚' },
  { id: '6', name: 'Belleza', icon: '💄' },
  { id: '7', name: 'Juguetes', icon: '🧸' },
  { id: '8', name: 'Automóviles', icon: '🚗' },
];

export const mockShops: Shop[] = [
  {
    id: '1',
    name: 'TechnoGuate',
    description: 'Los mejores productos tecnológicos de Guatemala',
    avatar: SHOP_AVATARS[0],
    rating: 4.8,
    reviewCount: 1250,
    location: 'Ciudad de Guatemala',
    joinedDate: '2020-03-15',
    policies: {
      returns: 'Devoluciones gratuitas hasta 30 días',
      shipping: 'Envío gratis en compras mayores a Q200',
      warranty: 'Garantía de 1 año en todos los productos'
    },
    categories: ['Electrónicos'],
    isVerified: true,
    responseTime: '2 horas'
  },
  {
    id: '2',
    name: 'Moda Chapina',
    description: 'Ropa y accesorios de moda guatemalteca',
    avatar: SHOP_AVATARS[1],
    rating: 4.6,
    reviewCount: 890,
    location: 'Antigua Guatemala',
    joinedDate: '2019-08-22',
    policies: {
      returns: 'Cambios hasta 15 días',
      shipping: 'Envío a todo el país',
      warranty: 'Garantía de calidad'
    },
    categories: ['Ropa'],
    isVerified: true,
    responseTime: '4 horas'
  },
  {
    id: '3',
    name: 'Casa Bella',
    description: 'Decoración y muebles para el hogar',
    avatar: SHOP_AVATARS[2],
    rating: 4.7,
    reviewCount: 650,
    location: 'Quetzaltenango',
    joinedDate: '2021-01-10',
    policies: {
      returns: 'Devoluciones hasta 7 días',
      shipping: 'Envío especializado para muebles',
      warranty: 'Garantía de fabricante'
    },
    categories: ['Hogar'],
    isVerified: false,
    responseTime: '6 horas'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro Max 256GB',
    description: 'El iPhone más avanzado con cámara profesional y chip A16 Bionic',
    price: 8500,
    originalPrice: 9200,
    images: [PRODUCT_IMAGES[0], PRODUCT_IMAGES[1]],
    category: 'Electrónicos',
    subcategory: 'Smartphones',
    brand: 'Apple',
    condition: 'new',
    shopId: '1',
    rating: 4.9,
    reviewCount: 156,
    stock: 12,
    shipping: {
      free: true,
      estimatedDays: '2-3 días'
    },
    specifications: {
      'Pantalla': '6.7" Super Retina XDR',
      'Almacenamiento': '256GB',
      'Cámara': '48MP + 12MP + 12MP',
      'Batería': 'Hasta 29 horas de video'
    },
    tags: ['smartphone', 'apple', 'premium']
  },
  {
    id: '2',
    name: 'Blusa Típica Guatemalteca',
    description: 'Hermosa blusa bordada a mano por artesanas guatemaltecas',
    price: 350,
    images: [PRODUCT_IMAGES[2]],
    category: 'Ropa',
    subcategory: 'Blusas',
    brand: 'Artesanías Chapinas',
    condition: 'new',
    shopId: '2',
    rating: 4.8,
    reviewCount: 89,
    stock: 5,
    shipping: {
      free: false,
      cost: 25,
      estimatedDays: '3-5 días'
    },
    specifications: {
      'Material': '100% Algodón',
      'Talla': 'M',
      'Origen': 'Chichicastenango'
    },
    tags: ['artesanía', 'típica', 'bordado']
  },
  {
    id: '3',
    name: 'Sofá Modular 3 Plazas',
    description: 'Cómodo sofá modular perfecto para salas modernas',
    price: 2800,
    originalPrice: 3200,
    images: [PRODUCT_IMAGES[3], PRODUCT_IMAGES[4]],
    category: 'Hogar',
    subcategory: 'Muebles',
    brand: 'Casa Bella',
    condition: 'new',
    shopId: '3',
    rating: 4.5,
    reviewCount: 34,
    stock: 3,
    shipping: {
      free: true,
      estimatedDays: '5-7 días'
    },
    specifications: {
      'Material': 'Tela microfibra',
      'Dimensiones': '200x90x85 cm',
      'Color': 'Gris'
    },
    tags: ['muebles', 'sala', 'modular']
  },
  {
    id: '4',
    name: 'Laptop Gaming MSI',
    description: 'Laptop para gaming con RTX 4060 y procesador Intel i7',
    price: 12500,
    images: [PRODUCT_IMAGES[5]],
    category: 'Electrónicos',
    subcategory: 'Laptops',
    brand: 'MSI',
    condition: 'new',
    shopId: '1',
    rating: 4.7,
    reviewCount: 78,
    stock: 8,
    shipping: {
      free: true,
      estimatedDays: '2-3 días'
    },
    specifications: {
      'Procesador': 'Intel Core i7-13700H',
      'Memoria': '16GB DDR5',
      'Almacenamiento': '1TB SSD',
      'Gráficos': 'RTX 4060 8GB'
    },
    tags: ['gaming', 'laptop', 'msi']
  },
  {
    id: '5',
    name: 'Huipil Tradicional',
    description: 'Auténtico huipil tejido a mano de San Juan Sacatepéquez',
    price: 850,
    images: [PRODUCT_IMAGES[6]],
    category: 'Ropa',
    subcategory: 'Vestidos',
    brand: 'Textiles Mayas',
    condition: 'new',
    shopId: '2',
    rating: 4.9,
    reviewCount: 45,
    stock: 2,
    shipping: {
      free: false,
      cost: 35,
      estimatedDays: '4-6 días'
    },
    specifications: {
      'Material': '100% Algodón',
      'Técnica': 'Telar de cintura',
      'Origen': 'San Juan Sacatepéquez'
    },
    tags: ['huipil', 'tradicional', 'maya']
  },
  {
    id: '6',
    name: 'Mesa de Centro Moderna',
    description: 'Elegante mesa de centro con diseño minimalista',
    price: 1200,
    images: [PRODUCT_IMAGES[7]],
    category: 'Hogar',
    subcategory: 'Muebles',
    brand: 'Casa Bella',
    condition: 'new',
    shopId: '3',
    rating: 4.4,
    reviewCount: 23,
    stock: 6,
    shipping: {
      free: true,
      estimatedDays: '3-5 días'
    },
    specifications: {
      'Material': 'Madera de roble',
      'Dimensiones': '120x60x45 cm',
      'Acabado': 'Natural'
    },
    tags: ['mesa', 'centro', 'moderna']
  }
];

export const mockUser: User = {
  id: '1',
  name: 'María González',
  email: 'maria@example.com',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
  phone: '+502 5555-1234',
  addresses: [
    {
      id: '1',
      name: 'Casa',
      street: '5ta Avenida 12-34, Zona 10',
      city: 'Ciudad de Guatemala',
      department: 'Guatemala',
      postalCode: '01010',
      isDefault: true
    },
    {
      id: '2',
      name: 'Trabajo',
      street: '15 Calle 8-45, Zona 1',
      city: 'Ciudad de Guatemala',
      department: 'Guatemala',
      postalCode: '01001',
      isDefault: false
    }
  ],
  favoriteProducts: ['1', '3', '5'],
  favoriteShops: ['1', '2']
};

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [
      {
        productId: '1',
        product: mockProducts[0],
        quantity: 1,
        price: 8500,
      }
    ],
    total: 8500,
    subtotal: 8500,
    shipping: 0,
    tax: 0,
    status: 'shipped',
    escrowStatus: 'pending',
    shippingAddress: mockUser.addresses[0],
    paymentMethod: 'PayPal',
    createdAt: '2024-01-15T10:30:00Z',
    estimatedDelivery: '2024-01-18',
    trackingNumber: 'GT123456789'
  },
  {
    id: 'ORD-002',
    userId: '1',
    items: [
      {
        productId: '2',
        product: mockProducts[1],
        quantity: 2,
        price: 350,
      }
    ],
    total: 725,
    subtotal: 700,
    shipping: 25,
    tax: 0,
    status: 'delivered',
    escrowStatus: 'released',
    shippingAddress: mockUser.addresses[0],
    paymentMethod: 'Tarjeta de Crédito',
    createdAt: '2024-01-10T14:20:00Z',
    estimatedDelivery: '2024-01-15',
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Carlos Pérez',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    productId: '1',
    rating: 5,
    comment: 'Excelente producto, llegó muy rápido y en perfectas condiciones.',
    createdAt: '2024-01-12T16:45:00Z',
    helpful: 12
  },
  {
    id: '2',
    userId: '3',
    userName: 'Ana López',
    userAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
    productId: '1',
    rating: 4,
    comment: 'Muy buen teléfono, la cámara es increíble. Solo el precio es un poco alto.',
    createdAt: '2024-01-08T09:15:00Z',
    helpful: 8
  },
  {
    id: '3',
    userId: '4',
    userName: 'Roberto Silva',
    shopId: '1',
    rating: 5,
    comment: 'Excelente servicio al cliente, muy recomendado.',
    createdAt: '2024-01-05T11:30:00Z',
    helpful: 15
  }
];

export const recentSearches = [
  'iPhone 14',
  'huipil',
  'sofá',
  'laptop gaming',
  'mesa de centro'
];