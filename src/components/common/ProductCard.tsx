import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onProductClick: (productId: string) => void;
  onFavoriteClick?: (productId: string) => void;
  isFavorite?: boolean;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onFavoriteClick,
  isFavorite = false,
  compact = false,
}) => {
  const handleCardClick = () => {
    onProductClick(product.id);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick?.(product.id);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: 'pointer',
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-2px)',
          transition: 'transform 0.2s ease-in-out',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{
            aspectRatio: '4/3',
            objectFit: 'cover',
          }}
          image={product.images[0]}
          alt={product.name}
        />
        
        {/* Favorite Button */}
        {onFavoriteClick && (
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            }}
            size="small"
          >
            {isFavorite ? (
              <Favorite color="error" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" />
            )}
          </IconButton>
        )}

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <Chip
            label={`-${discountPercentage}%`}
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              fontWeight: 'bold',
            }}
          />
        )}

        {/* Free Shipping Badge */}
        {product.shipping.free && (
          <Chip
            label="Envío gratis"
            color="success"
            size="small"
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              fontSize: '0.7rem',
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, p: compact ? 1 : 2 }}>
        <Typography
          variant={compact ? 'body2' : 'subtitle2'}
          component="h3"
          sx={{
            fontWeight: 500,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </Typography>

        {product.brand && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mb: 0.5 }}
          >
            {product.brand}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <Typography
            variant={compact ? 'body2' : 'h6'}
            component="span"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Q{product.price.toLocaleString()}
          </Typography>
          {product.originalPrice && (
            <Typography
              variant="caption"
              component="span"
              sx={{
                textDecoration: 'line-through',
                color: 'text.secondary',
              }}
            >
              Q{product.originalPrice.toLocaleString()}
            </Typography>
          )}
        </Box>

        {!compact && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              ⭐ {product.rating}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ({product.reviewCount})
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;