"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  Grid,
  Container,
  Avatar,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  RedeemRounded,
  PhoneAndroidRounded,
  RoofingRounded,
  ToysRounded,
} from '@mui/icons-material';
import TopAppBar from '../components/layout/TopAppBar';
import ProductCard from '../components/common/ProductCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import SectionHeader from '../components/common/SectionHeader';
import { Product, Category } from '../types';
import { getProducts, getRecentlyViewed, getRecommendedProducts } from '../services/productService';
import { getCategories } from '../services/categoryService';
import { toggleFavoriteProduct, getFavoriteProducts } from '../services/userService';
import { addToRecentlyViewed } from '../services/productService';

export default function HomePage() {
  const router = useRouter();
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
    router.push(`/product/${productId}`);
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
    router.push(`/category/${categoryId}`);
  };

  const handleViewAll = (section: string) => {
    // Navigate to appropriate page based on section
    switch (section) {
      case 'recent':
        router.push('/search?filter=recent');
        break;
      case 'recommended':
        router.push('/search?filter=recommended');
        break;
      default:
        router.push('/search');
    }
  };

  if (loading) {
    return (
      <Box>
        <TopAppBar />
        <Container maxWidth="lg" sx={{ p: 2 }}>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Categories */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              overflowX: 'auto',
              pb: 1,
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <Chip
              icon={<RedeemRounded />}
              label="Regalos"
              onClick={() => handleCategoryClick('gifts')}
              size="small"
              sx={{
                backgroundColor: 'action.selected',
                color: 'text.primary',
                fontSize: '12px',
                lineHeight: '16px',
                letterSpacing: '0.1px',
                '&:hover': {
                  backgroundColor: 'action.focus',
                },
              }}
            />
            <Chip
              icon={<PhoneAndroidRounded />}
              label="Electrónicos"
              onClick={() => handleCategoryClick('electronics')}
              size="small"
              sx={{
                backgroundColor: 'action.selected',
                color: 'text.primary',
                fontSize: '12px',
                lineHeight: '16px',
                letterSpacing: '0.1px',
                '&:hover': {
                  backgroundColor: 'action.focus',
                },
              }}
            />
            <Chip
              icon={<RoofingRounded />}
              label="Hogar"
              onClick={() => handleCategoryClick('home')}
              size="small"
              sx={{
                backgroundColor: 'action.selected',
                color: 'text.primary',
                fontSize: '12px',
                lineHeight: '16px',
                letterSpacing: '0.1px',
                '&:hover': {
                  backgroundColor: 'action.focus',
                },
              }}
            />
            <Chip
              icon={<ToysRounded />}
              label="Juguetes"
              onClick={() => handleCategoryClick('toys')}
              size="small"
              sx={{
                backgroundColor: 'action.selected',
                color: 'text.primary',
                fontSize: '12px',
                lineHeight: '16px',
                letterSpacing: '0.1px',
                '&:hover': {
                  backgroundColor: 'action.focus',
                },
              }}
            />
          </Box>

          {/* Recently Viewed */}
          {recentlyViewed.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <SectionHeader 
                title="Visto recientemente" 
                onViewAll={() => handleViewAll('recent')} 
              />
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
                <Box key={product.id} sx={{ minWidth: 150 }}>
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <SectionHeader 
              title="Para tí" 
              onViewAll={() => handleViewAll('recommended')} 
            />
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
              <Box key={product.id} sx={{ minWidth: 150 }}>
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <SectionHeader 
              title="Explora" 
              showViewAll={false} 
            />
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
        </Box>
      </Container>
    </Box>
  );
}
