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
  fixWidth?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  fixWidth = false,
}) => {
  const handleCardClick = () => {
    onProductClick(product.id);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...(fixWidth && { 
          width: '155px',
          flexShrink: 0 
        }),
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
            sx={{
              mb: 0.25,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography
              variant="h6"
              sx={{
                ...(hasDiscount && { color: 'primary.main' })
              }}
            >
              Q{product.price.toLocaleString()}
            </Typography>
            {hasDiscount && (
              <Typography
                variant="body1"
                component="span"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                }}
              >
                Q{product.originalPrice!.toLocaleString()}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
