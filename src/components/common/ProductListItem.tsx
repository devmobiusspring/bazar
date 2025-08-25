import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Rating,
} from '@mui/material';
import { FavoriteRounded, FavoriteBorderRounded } from '@mui/icons-material';
import { Product } from '../../types';

interface ProductListItemProps {
  product: Product;
  onProductClick: (productId: string) => void;
  onFavoriteClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  isFavorite?: boolean;
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  onProductClick,
  onFavoriteClick,
  onAddToCart,
  isFavorite = false,
}) => {
  const handleProductClick = () => {
    onProductClick(product.id);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick?.(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Box
      onClick={handleProductClick}
      sx={{
        display: 'flex',
        p: 2,
        cursor: 'pointer',
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      {/* Product Image */}
      <Box sx={{ position: 'relative', mr: 2 }}>
        <Box
          component="img"
          src={product.images[0]}
          alt={product.name}
          sx={{
            width: 100,
            height: 100,
            objectFit: 'cover',
            borderRadius: 1,
          }}
        />
        
        {/* Favorite Button Overlay */}
        {onFavoriteClick && (
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              position: 'absolute',
              top: 4,
              right: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              p: 0.5,
            }}
            size="small"
          >
            {isFavorite ? (
              <FavoriteRounded color="error" fontSize="small" />
            ) : (
              <FavoriteBorderRounded fontSize="small" />
            )}
          </IconButton>
        )}
      </Box>

      {/* Product Info */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 500,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
          {product.condition === 'new' ? 'Nuevo' : 
           product.condition === 'used' ? 'Usado' : 'Reacondicionado'}
          {product.brand && ` • ${product.brand}`}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <Rating value={product.rating} precision={0.1} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">
            ({product.reviewCount})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography
            variant="h6"
            component="span"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Q{product.price.toLocaleString()}
          </Typography>
          {product.originalPrice && (
            <>
              <Typography
                variant="body2"
                component="span"
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
                sx={{ fontSize: '0.7rem' }}
              />
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">
            {product.shipping.free ? 'Envío gratis' : `Envío Q${product.shipping.cost}`}
            {' • '}
            {product.shipping.estimatedDays}
          </Typography>

          {onAddToCart && (
            <Button
              variant="contained"
              size="small"
              onClick={handleAddToCart}
              sx={{ minWidth: 'auto', px: 2 }}
            >
              Agregar
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductListItem;