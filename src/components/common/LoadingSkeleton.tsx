import React from 'react';
import { Box, Skeleton, Card, CardContent } from '@mui/material';

interface LoadingSkeletonProps {
  variant?: 'product-card' | 'product-list' | 'shop-card' | 'text' | 'image';
  count?: number;
  height?: number | string;
  width?: number | string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  count = 1,
  height,
  width,
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'product-card':
        return (
          <Card variant='outlined'>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" height={24} />
              <Skeleton variant="text" height={20} width="60%" />
              <Skeleton variant="text" height={28} width="40%" />
            </CardContent>
          </Card>
        );

      case 'product-list':
        return (
          <Box sx={{ display: 'flex', py: 1, gap: 2 }}>
            <Skeleton variant="rectangular" width={100} height={100} />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" height={24} />
              <Skeleton variant="text" height={20} width="80%" />
              <Skeleton variant="text" height={20} width="60%" />
              <Skeleton variant="text" height={28} width="40%" />
            </Box>
          </Box>
        );

      case 'shop-card':
        return (
          <Card variant='outlined'>
            <Box sx={{ display: 'flex', p: 2, gap: 2 }}>
              <Skeleton variant="circular" width={60} height={60} />
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" height={24} />
                <Skeleton variant="text" height={20} width="70%" />
                <Skeleton variant="text" height={20} width="50%" />
              </Box>
            </Box>
          </Card>
        );

      case 'image':
        return (
          <Skeleton
            variant="rectangular"
            height={height || 200}
            width={width || '100%'}
          />
        );

      default:
        return (
          <Skeleton
            variant="text"
            height={height || 20}
            width={width || '100%'}
          />
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index} sx={{ mb: variant === 'product-list' ? 0 : 2 }}>
          {renderSkeleton()}
        </Box>
      ))}
    </>
  );
};

export default LoadingSkeleton;