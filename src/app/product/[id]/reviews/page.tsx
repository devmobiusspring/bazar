"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Avatar,
  Rating,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import {
  VerifiedRounded,
} from '@mui/icons-material';
import { useParams } from 'next/navigation';

import TopAppBar from '../../../../components/layout/TopAppBar';
import LoadingSkeleton from '../../../../components/common/LoadingSkeleton';
import ReviewDetails from '../../../../components/common/ReviewDetails';
import { Product, Review } from '../../../../types';
import { getProductById } from '../../../../services/productService';
import { mockReviews } from '../../../../services/mockData';

type SortOption = 'relevant' | 'recent';

const ReviewsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('relevant');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadReviewsData(id);
    }
  }, [id]);

  const loadReviewsData = async (productId: string) => {
    try {
      const productData = await getProductById(productId);
      
      if (productData) {
        setProduct(productData);
        
        // Load reviews for this product
        const productReviews = mockReviews.filter(r => r.productId === productId);
        setReviews(productReviews);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedReviews = React.useMemo(() => {
    const sorted = [...reviews];
    if (sortBy === 'relevant') {
      // Sort by rating (highest first) then by date
      return sorted.sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    } else {
      // Sort by date (most recent first)
      return sorted.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  }, [reviews, sortBy]);

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  if (!id) {
    return <div>Producto no encontrado</div>;
  }

  if (loading) {
    return (
      <Box>
        <TopAppBar showBack />
        <Container maxWidth="lg">
          <Box sx={{ p: 2 }}>
            <LoadingSkeleton variant="text" height={32} />
            <LoadingSkeleton variant="text" height={24} width="60%" />
            <LoadingSkeleton variant="text" height={120} />
          </Box>
        </Container>
      </Box>
    );
  }

  if (!product) {
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

  return (
    <Box>
      <TopAppBar showBack />
      
      <Container maxWidth="lg" sx={{ px: 2, pt: 1, pb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Product Summary */}
        <Box>
          <Typography variant="h4" sx={{ mb: 0.5 }}>
            Reseñas
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating
              value={averageRating}
              precision={0.1}
              size="small"
              readOnly
            />
            <Typography variant="body1">
              {averageRating.toFixed(1)} de 5
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ({reviews.length} calificaciones)
            </Typography>
          </Box>
        </Box>

        {/* Rating Breakdown */}
        {reviews.length > 0 && (
          <Box>
            {[5, 4, 3, 2, 1].map((starCount) => {
              const count = reviews.filter(r => r.rating === starCount).length;
              const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
              
              return (
                <Box 
                  key={starCount} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    mb: 1
                  }}
                >
                  <Typography variant="body1" sx={{ minWidth: '60px' }}>
                    {starCount} estrellas
                  </Typography>
                  
                  <Box sx={{ flex: 1, position: 'relative', height: 20 }}>
                    {/* Background bar */}
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'background.muted',
                        borderRadius: 1
                      }} 
                    />
                    {/* Progress bar */}
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: 'success.main',
                        borderRadius: 1
                      }} 
                    />
                  </Box>
                  
                  <Typography variant="body1" sx={{ minWidth: '40px', textAlign: 'right' }}>
                    {percentage}%
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}

        <Divider />

        {/* Sort Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1">
            Ordenar por:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <MenuItem value="relevant">Relevantes</MenuItem>
              <MenuItem value="recent">Más recientes</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Reviews List */}
        <List sx={{ width: '100%', p: 0 }}>
          {sortedReviews.map((review, index) => (
            <ReviewDetails 
              key={review.id} 
              review={review} 
              showDivider={index < sortedReviews.length - 1} 
            />
          ))}
        </List>

        {reviews.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No hay reseñas disponibles para este producto
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ReviewsPage;