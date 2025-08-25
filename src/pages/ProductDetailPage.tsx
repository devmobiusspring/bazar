"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Container,
  Grid,
  Card,
  CardContent,
  Fab,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  FavoriteRounded,
  FavoriteBorderRounded,
  ShareRounded,
  LocalShippingRounded,
  SecurityRounded,
  UndoRounded,
  StarRounded,
  StarBorderRounded,
  StarHalfRounded,
  AddRounded,
  RemoveRounded,
  ShoppingCartRounded,
} from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import TopAppBar from '../components/layout/TopAppBar';
import ProductCard from '../components/common/ProductCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { Product, Shop, Review } from '../types';
import { getProductById, getRecommendedProducts } from '../services/productService';
import { getShopById } from '../services/shopService';
import { addToCart } from '../services/cartService';
import { toggleFavoriteProduct, getFavoriteProducts } from '../services/userService';
import { mockReviews } from '../services/mockData';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProductData(id);
    }
  }, [id]);

  if (!id) {
    return <div>Product not found</div>;
  }

  const loadProductData = async (productId: string) => {
    try {
      const [productData, favoritesData, recommendedData] = await Promise.all([
        getProductById(productId),
        getFavoriteProducts('1'),
        getRecommendedProducts(productId),
      ]);

      if (productData) {
        setProduct(productData);
        setIsFavorite(favoritesData.includes(productId));
        setRecommendedProducts(recommendedData);

        // Load shop data
        const shopData = await getShopById(productData.shopId);
        setShop(shopData);

        // Load reviews
        const productReviews = mockReviews.filter(r => r.productId === productId);
        setReviews(productReviews);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id);
      // Trigger storage event to update cart count
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleFavoriteClick = async () => {
    if (product) {
      try {
        const newIsFavorite = await toggleFavoriteProduct('1', product.id);
        setIsFavorite(newIsFavorite);
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    }
  };

  const handleShopClick = () => {
    if (shop) {
      router.push(`/shop/${shop.id}`);
    }
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  if (loading) {
    return (
      <Box>
        <TopAppBar showBack />
        <Container maxWidth="lg">
          <LoadingSkeleton variant="image" height={300} />
          <Box sx={{ p: 2 }}>
            <LoadingSkeleton variant="text" height={32} />
            <LoadingSkeleton variant="text" height={24} width="60%" />
            <LoadingSkeleton variant="text" height={28} width="40%" />
          </Box>
        </Container>
      </Box>
    );
  }

  if (!product || !shop) {
    return (
      <Box>
        <TopAppBar showBack />
        <Container maxWidth="lg">
          <Typography variant="h6" sx={{ p: 2 }}>
            Producto no encontrado
          </Typography>
        </Container>
      </Box>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Box sx={{ pb: 10 }}>
      <TopAppBar showBack />

      {/* Product Images */}
      <Box sx={{ position: 'relative' }}>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          style={{ height: '300px' }}
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Action Buttons */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Fab
            size="small"
            onClick={handleFavoriteClick}
            sx={{ backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9) }}
          >
            {isFavorite ? (
              <FavoriteRounded color="error" fontSize="large" />
            ) : (
              <FavoriteBorderRounded fontSize="large" />
            )}
          </Fab>
          <Fab
            size="small"
            sx={{ backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9) }}
          >
            <ShareRounded />
          </Fab>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ px: 2 }}>
        {/* Product Info */}
        <Box sx={{ py: 2 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating value={product.rating} precision={0.1} size="small" readOnly />
            <Typography variant="body2" color="text.secondary">
              ({product.reviewCount} reseñas)
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography
              variant="h4"
              sx={{ color: 'primary.main' }}
            >
              Q{product.price.toLocaleString()}
            </Typography>
            {product.originalPrice && (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: 'line-through',
                    color: 'text.secondary',
                  }}
                >
                  Q{product.originalPrice.toLocaleString()}
                </Typography>
                <Chip
                  label={`-${discountPercentage}%`}
                  color="error"
                  size="small"
                />
              </>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip
              label={product.condition === 'new' ? 'Nuevo' : 
                    product.condition === 'used' ? 'Usado' : 'Reacondicionado'}
              size="small"
              color={product.condition === 'new' ? 'success' : 'default'}
            />
            {product.brand && (
              <Chip label={product.brand} size="small" variant="outlined" />
            )}
          </Box>

          {/* Shipping Info */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 2,
              backgroundColor: 'action.hover',
              borderRadius: 2,
              mb: 2,
            }}
          >
            <LocalShippingRounded sx={{ fontSize: 20 }} />
            <Box>
              <Typography variant="body2">
                {product.shipping.free ? 'Envío gratis' : `Envío Q${product.shipping.cost}`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Llega en {product.shipping.estimatedDays}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Shop Info */}
        <Box sx={{ py: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Vendido por
          </Typography>
          <Card onClick={handleShopClick} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={shop.avatar} sx={{ width: 50, height: 50 }}>
                  <SecurityRounded sx={{ fontSize: 20 }} />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">
                    {shop.name}
                    {shop.isVerified && (
                      <SecurityRounded
                        color="primary"
                        sx={{ ml: 1, fontSize: 16 }}
                      />
                    )}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={shop.rating} size="small" readOnly />
                    <Typography variant="caption" color="text.secondary">
                      ({shop.reviewCount})
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Responde en {shop.responseTime}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Divider />

        {/* Product Description */}
        <Box sx={{ py: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Descripción
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {product.description}
          </Typography>

          {/* Specifications */}
          {product.specifications && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Especificaciones
              </Typography>
              <List dense>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <ListItem key={key} sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            {key}
                          </Typography>
                          <Typography variant="body2">
                            {value}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>

        <Divider />

        {/* Reviews */}
        {reviews.length > 0 && (
          <Box sx={{ py: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Reseñas ({reviews.length})
            </Typography>
            {reviews.slice(0, 3).map((review) => (
              <Box key={review.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Avatar src={review.userAvatar} sx={{ width: 32, height: 32 }} />
                  <Typography variant="subtitle2">{review.userName}</Typography>
                  <Rating value={review.rating} size="small" readOnly />
                </Box>
                <Typography variant="body2" sx={{ ml: 5 }}>
                  {review.comment}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        <Divider />

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <Box sx={{ py: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Más como esto
            </Typography>
            <Grid container spacing={2}>
              {recommendedProducts.slice(0, 4).map((recommendedProduct) => (
                <Grid item xs={6} key={recommendedProduct.id}>
                  <ProductCard
                    product={recommendedProduct}
                    onProductClick={handleProductClick}
                    compact
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>

      {/* Sticky Add to Cart Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleAddToCart}
          startIcon={<ShoppingCartRounded />}
        >
          Agregar al carrito
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
