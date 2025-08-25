"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Container,
  Chip,
} from '@mui/material';
import { StoreRounded, VerifiedRounded } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TopAppBar from '../components/layout/TopAppBar';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { Shop, Category } from '../types';
import { getPopularShops } from '../services/shopService';
import { getCategories } from '../services/categoryService';

const ShopsPage: React.FC = () => {
  const router = useRouter();
  const [shops, setShops] = useState<Shop[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [shopsData, categoriesData] = await Promise.all([
        getPopularShops(),
        getCategories(),
      ]);

      setShops(shopsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading shops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShopClick = (shopId: string) => {
    router.push(`/shop/${shopId}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
  };

  const filteredShops = selectedCategory
    ? shops.filter(shop => {
        const category = categories.find(cat => cat.id === selectedCategory);
        return category && shop.categories.includes(category.name);
      })
    : shops;

  if (loading) {
    return (
      <Box>
        <TopAppBar title="Tiendas" />
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <LoadingSkeleton variant="shop-card" count={6} />
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <TopAppBar title="Tiendas" />

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Categories Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
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
                color={selectedCategory === category.id ? 'primary' : 'default'}
                variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                size="small"
                sx={{ minWidth: 'auto', whiteSpace: 'nowrap' }}
              />
            ))}
          </Box>
        </Box>

        {/* Shops Grid */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {selectedCategory ? 'Tiendas filtradas' : 'Tiendas populares'}
          </Typography>
          
          <Grid container spacing={2}>
            {filteredShops.map((shop) => (
              <Grid item xs={12} sm={6} md={4} key={shop.id}>
                <Card
                  onClick={() => handleShopClick(shop.id)}
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar
                        src={shop.avatar}
                        sx={{ width: 60, height: 60 }}
                      >
                        <StoreRounded sx={{ fontSize: 40, color: 'primary.main' }} />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          {shop.name}
                          {shop.isVerified && (
                            <VerifiedRounded sx={{ fontSize: 16, color: 'success.main' }} />
                          )}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {shop.location}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {shop.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Rating value={shop.rating} size="small" readOnly />
                      <Typography variant="caption" color="text.secondary">
                        ({shop.reviewCount})
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {shop.categories.slice(0, 2).map((category) => (
                        <Chip
                          key={category}
                          label={category}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      ))}
                      {shop.categories.length > 2 && (
                        <Chip
                          label={`+${shop.categories.length - 2}`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ShopsPage;
