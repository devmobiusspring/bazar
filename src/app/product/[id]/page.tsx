"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
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
  IconButton,
  ListItemAvatar,
  ListItemButton,
  CardActionArea,
} from '@mui/material';
import {
  FavoriteRounded,
  FavoriteBorderRounded,
  ShareRounded,
  SecurityRounded,
  ShoppingCartRounded,
  ChevronRightRounded,
  ShopRounded,
} from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import TopAppBar from '../../../components/layout/TopAppBar';
import ProductCard from '../../../components/common/ProductCard';
import LoadingSkeleton from '../../../components/common/LoadingSkeleton';
import { Product, Shop, Review } from '../../../types';
import { getProductById, getRecommendedProducts } from '../../../services/productService';
import { getShopById } from '../../../services/shopService';
import { addToCart } from '../../../services/cartService';
import { toggleFavoriteProduct, getFavoriteProducts } from '../../../services/userService';
import { mockReviews } from '../../../services/mockData';
import SectionHeader from '@/components/common/SectionHeader';
import HScrollContainer from '@/components/common/HScrollContainer';
import ReviewDetailDialog from '@/components/common/ReviewDetailDialog';
import ShippingInfoDialog from '@/components/common/ShippingInfoDialog';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [shippingDialogOpen, setShippingDialogOpen] = useState(false);

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
        return
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

  const handleShippingClick = () => {
    setShippingDialogOpen(true);
  }

  const handleShippingDialogClose = () => {
    setShippingDialogOpen(false);
  };

  const handleReviewsClick = () => {
    router.push(`/product/${id}/reviews`);
  };

  const handleReviewCardClick = (review: Review) => {
    setSelectedReview(review);
    setReviewDialogOpen(true);
  };

  const handleReviewDialogClose = () => {
    setReviewDialogOpen(false);
    setSelectedReview(null);
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

  // Calculate average rating from reviews
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  const totalRatings = reviews.length;

  return (
    <Box>
      <TopAppBar showBack />

      {/* Product Images */}
      <Box sx={{ position: 'relative', backgroundColor: 'background.muted' }}>
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
                  objectFit: 'contain',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </Box>

      <Container maxWidth="lg" sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Product Info */}
        <Box>
          {/* Action Buttons */}

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }} >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                4.9
              </Typography>
              <Rating value={product.rating} precision={0.1} size="small" readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.reviewCount})
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 0.5, }} >
              <IconButton size='small'>
                {isFavorite ? (
                  <FavoriteRounded fontSize="small" onClick={handleFavoriteClick} />
                ) : (
                  <FavoriteBorderRounded fontSize="small" />
                )}
              </IconButton>
              <IconButton size='small'>
                <ShareRounded fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Typography variant="h5" sx={{ mb: 1 }}>
            {product.name}
          </Typography>

          {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating value={product.rating} precision={0.1} size="small" readOnly />
            <Typography variant="body2" color="text.secondary">
              ({product.reviewCount} reseñas)
            </Typography>
          </Box> */}

          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Typography
              variant="h4"
            >
              Q{product.price.toLocaleString()}
            </Typography>
            {product.originalPrice && (
              <Typography
                variant="h4"
                color='error'
              >
                -{discountPercentage}%
              </Typography>
            )}
          </Box>

          {product.originalPrice && (
            <Box sx={{ display: 'flex', gap: 1, mb: 0.25 }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                }}
              >
                Precio origintal:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                }}
              >
                Q{product.originalPrice.toLocaleString()}
              </Typography>
            </Box>
          )}

          {/* Condition */}

          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Typography
              variant="body1"
              color='text.secondary'
            >
              Condición:
            </Typography>
            <Typography
              variant="body1"
            // color='text.secondary'
            >
              {product.condition === 'new' ? 'Nuevo' :
                product.condition === 'used' ? 'Usado' : 'Reacondicionado'}
            </Typography>
          </Box>

          {/* Shipping Info */}
          <ListItem sx={{ p: 0, cursor: 'pointer' }} onClick={handleShippingClick}>
            <ListItemText
              primary={product.shipping.free ? 'Envío gratis' : `Envío Q${product.shipping.cost}`}
              secondary={`Llega en ${product.shipping.estimatedDays}`}
            />
            <ChevronRightRounded />
          </ListItem>
        </Box>

        <Box>
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

        <Divider />

        {/* Product Description */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Descripción del producto
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
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
                          <Typography variant="body1" color="text.secondary">
                            {key}
                          </Typography>
                          <Typography variant="body1">
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

        {/* Shop Info */}

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Acerca de la tienda
          </Typography>
          <ListItemButton sx={{ mx: -2 }}>
            <ListItemAvatar sx={{ mr: 2 }}>
              <Avatar src={shop.avatar}>
                <ShopRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                  {shop.name}
                  {shop.isVerified && (
                    <SecurityRounded
                      color="primary"
                      sx={{ ml: 1, fontSize: 16 }}
                    />
                  )}
                </Typography>
              }
              secondary={`Feedback 100% positivo (${shop.reviewCount})`}
            />
          </ListItemButton>
        </Box>

        {/* Reviews */}
        {reviews.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Reseñas
            </Typography>

            {/* Average Rating Display */}
            {reviews.length > 0 && (
              <ListItem sx={{ p: 0, cursor: 'pointer', mb: 2 }} onClick={handleReviewsClick}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating
                        value={averageRating}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                      <Typography variant="body1">
                        {averageRating.toFixed(1)} de 5
                      </Typography>
                    </Box>
                  }
                  secondary={`${totalRatings.toLocaleString()} calificaciones`}
                />
                <ChevronRightRounded />
              </ListItem>
            )}

            <HScrollContainer sx={{ mb: 2 }}>
              {reviews.map((review) => (
                <Card key={review.id} sx={{ minWidth: 300 }} >
                  <CardActionArea sx={{ height: '100%' }} onClick={() => handleReviewCardClick(review)}>
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'space-between', minHeight: 180 }} >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography variant="subtitle2">
                            {review.userName.replace(/(.{1})(.*)/, '$1***$2')}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" >
                            12/12/25
                          </Typography>
                          <Rating
                            value={review.rating}
                            size="small"
                            readOnly
                          />
                        </Box>
                      </Box>
                      <Typography 
                        variant="body1"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {review.comment}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </HScrollContainer>

            <Button
              variant="outlined"
              fullWidth
              onClick={handleReviewsClick}
            >
              Ver todas las reseñas
            </Button>

          </Box>
        )}

        <Divider />

        {/* Recommended Products */}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <SectionHeader
            title="Más como esto"
          // onViewAll={() => handleViewAll('recommended')}
          />
          <Grid container spacing={1}>
            {recommendedProducts.map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <ProductCard
                  product={product}
                  onProductClick={handleProductClick}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <ReviewDetailDialog
        review={selectedReview}
        open={reviewDialogOpen}
        onClose={handleReviewDialogClose}
      />
      
      <ShippingInfoDialog
        open={shippingDialogOpen}
        onClose={handleShippingDialogClose}
      />
    </Box>
  );
};

export default ProductDetailPage;
