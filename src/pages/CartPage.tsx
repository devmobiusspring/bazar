"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  Container,
  Divider,
  TextField,
} from '@mui/material';
import {
  AddRounded,
  RemoveRounded,
  DeleteRounded,
  ShoppingCartRounded,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TopAppBar from '../components/layout/TopAppBar';
import EmptyState from '../components/common/EmptyState';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { Product, CartItem } from '../types';
import {
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
  getCartTotal,
} from '../services/cartService';
import { getProductById } from '../services/productService';

interface CartItemWithProduct extends CartItem {
  product: Product;
}

const CartPage: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = async () => {
    try {
      const items = getCartItems();
      const itemsWithProducts: CartItemWithProduct[] = [];

      for (const item of items) {
        const product = await getProductById(item.productId);
        if (product) {
          itemsWithProducts.push({ ...item, product });
        }
      }

      setCartItems(itemsWithProducts);
      
      const cartTotals = await getCartTotal();
      setTotals(cartTotals);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    updateCartItemQuantity(productId, newQuantity);
    
    // Update local state
    setCartItems(items =>
      items.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    // Recalculate totals
    const cartTotals = await getCartTotal();
    setTotals(cartTotals);
    
    // Trigger storage event to update cart count
    window.dispatchEvent(new Event('storage'));
  };

  const handleRemoveItem = async (productId: string) => {
    removeFromCart(productId);
    
    // Update local state
    setCartItems(items => items.filter(item => item.productId !== productId));
    
    // Recalculate totals
    const cartTotals = await getCartTotal();
    setTotals(cartTotals);
    
    // Trigger storage event to update cart count
    window.dispatchEvent(new Event('storage'));
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (loading) {
    return (
      <Box>
        <TopAppBar title="Carrito" showBack />
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <LoadingSkeleton variant="product-list" count={3} />
        </Container>
      </Box>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Box>
        <TopAppBar title="Carrito" showBack />
        <EmptyState
          icon={<ShoppingCartRounded />}
          title="Tu carrito está vacío"
          description="Agrega productos a tu carrito para continuar con tu compra"
          actionLabel="Explorar productos"
          onAction={() => router.push('/')}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 10 }}>
      <TopAppBar title="Carrito" showBack />

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Cart Items */}
        <Box sx={{ mb: 3 }}>
          {cartItems.map((item) => (
            <Card key={item.productId} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {/* Product Image */}
                  <Box
                    component="img"
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onClick={() => handleProductClick(item.productId)}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 1,
                      cursor: 'pointer',
                    }}
                  />

                  {/* Product Info */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle2"
                      onClick={() => handleProductClick(item.productId)}
                      sx={{
                        cursor: 'pointer',
                        mb: 0.5,
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {item.product.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.product.brand}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{ color: 'primary.main', mb: 1 }}
                    >
                      Q{item.product.price.toLocaleString()}
                    </Typography>

                    {/* Quantity Controls */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveRounded />
                      </IconButton>
                      
                      <TextField
                        size="small"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 1;
                          handleQuantityChange(item.productId, value);
                        }}
                        inputProps={{
                          style: { textAlign: 'center', width: '40px' },
                          min: 1,
                          max: item.product.stock,
                        }}
                        type="number"
                      />
                      
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <AddRounded />
                      </IconButton>

                      <IconButton
                        size="small"
                        onClick={() => handleRemoveItem(item.productId)}
                        sx={{ ml: 'auto', color: 'error.main' }}
                      >
                        <DeleteRounded />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Order Summary */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Resumen del pedido
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">
                Q{totals.subtotal.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Envío</Typography>
              <Typography variant="body2">
                {totals.shipping === 0 ? 'Gratis' : `Q${totals.shipping.toLocaleString()}`}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                Total
              </Typography>
              <Typography variant="h6" sx={{ color: 'primary.main' }}>
                Q{totals.total.toLocaleString()}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
            >
              Proceder al pago
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CartPage;
