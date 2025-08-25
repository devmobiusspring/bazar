import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onProductClick: (productId: string) => void;
  discountedPrice?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  discountedPrice,
}) => {
  const handleCardClick = () => {
    onProductClick(product.id);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea
        onClick={handleCardClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            aspectRatio: '4/3',
            objectFit: 'cover',
          }}
          image={product.images[0]}
          alt={product.name}
        />

        <CardContent sx={{ p: 1 }}>
          <Typography
            variant="body1"
            component="h3"
            sx={{
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="subtitle2"
              component="span"
              sx={{ color: 'primary.main', fontWeight: 600 }}
            >
              Q{(discountedPrice || product.price).toLocaleString()}
            </Typography>
            {discountedPrice && (
              <Typography
                variant="body2"
                component="span"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                }}
              >
                Q{product.price.toLocaleString()}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
