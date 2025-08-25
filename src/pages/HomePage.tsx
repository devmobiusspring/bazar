import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  Grid,
  Container,
} from '@mui/material';
// This file is no longer used - HomePage is now in src/app/page.tsx
import TopAppBar from '../components/layout/TopAppBar';
import ProductCard from '../components/common/ProductCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { Product, Category } from '../types';
import { getProducts, getRecentlyViewed, getRecommendedProducts } from '../services/productService';
import { getCategories } from '../services/categoryService';
import { toggleFavoriteProduct, getFavoriteProducts } from '../services/userService';
import { addToRecentlyViewed } from '../services/productService';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [exploreProducts, setExploreProducts] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        categoriesData,
        recentData,
        recommendedData,
        exploreData,
        favoritesData,
      ] = await Promise.all([
        getCategories(),
        getRecentlyViewed(),
        getRecommendedProducts(),
        getProducts(),
        getFavoriteProducts('1'),
      ]);

      setCategories(categoriesData);
      setRecentlyViewed(recentData);
      setRecommendedProducts(recommendedData);
      setExploreProducts(exploreData);
      setFavoriteProducts(favoritesData);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId: string) => {
    addToRecentlyViewed(productId);
    navigate(`/product/${productId}`);
  };

  const handleFavoriteClick = async (productId: string) => {
    try {
      const isFavorite = await toggleFavoriteProduct('1', productId);
      if (isFavorite) {
        setFavoriteProducts([...favoriteProducts, productId]);
      } else {
        setFavoriteProducts(favoriteProducts.filter(id => id !== productId));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  if (loading) {
    return (
      <Box>
        <TopAppBar />
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <LoadingSkeleton variant="text" height={32} width="60%" />
          <Box sx={{ display: 'flex', gap: 1, my: 2, overflowX: 'auto' }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={index} variant="text" height={32} width={80} />
            ))}
          </Box>
          <LoadingSkeleton variant="product-card" count={6} />
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <TopAppBar />
      
      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Categories */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Categorías
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              overflowX: 'auto',
              pb: 1,
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={`${category.icon} ${category.name}`}
                onClick={() => handleCategoryClick(category.id)}
                size="small"
                sx={{
                  minWidth: 'auto',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Recientemente vistos
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                overflowX: 'auto',
                pb: 1,
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {recentlyViewed.map((product) => (
                <Box key={product.id} sx={{ minWidth: 200 }}>
                  <ProductCard
                    product={product}
                    onProductClick={handleProductClick}
                    onFavoriteClick={handleFavoriteClick}
                    isFavorite={favoriteProducts.includes(product.id)}
                    compact
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Recommended Products */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Para ti
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              overflowX: 'auto',
              pb: 1,
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {recommendedProducts.map((product) => (
              <Box key={product.id} sx={{ minWidth: 200 }}>
                <ProductCard
                  product={product}
                  onProductClick={handleProductClick}
                  onFavoriteClick={handleFavoriteClick}
                  isFavorite={favoriteProducts.includes(product.id)}
                  compact
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Explore Products Grid */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Explorar
          </Typography>
          <Grid container spacing={2}>
            {exploreProducts.map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <ProductCard
                  product={product}
                  onProductClick={handleProductClick}
                  onFavoriteClick={handleFavoriteClick}
                  isFavorite={favoriteProducts.includes(product.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;