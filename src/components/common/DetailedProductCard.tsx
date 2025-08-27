import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Rating,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material';
import { FavoriteRounded, FavoriteBorderRounded } from '@mui/icons-material';
import { Product } from '../../types';
import { alpha } from '@mui/material/styles';

interface DetailedProductCardProps {
  product: Product;
  onProductClick: (productId: string) => void;
  onFavoriteClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  isFavorite?: boolean;
}

const DetailedProductCard: React.FC<DetailedProductCardProps> = ({
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
    e.preventDefault();
    onFavoriteClick?.(product.id);
  };

  const handleFavoriteMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleFavoriteTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const handleAddToCartMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleAddToCartTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card
      sx={{
        border: 'none',
        borderRadius: 0
      }}
    >
      <CardActionArea
        onClick={handleProductClick}
        sx={{
          py: 1,
          px: 2
        }}
      >
        <Box sx={{ display: 'flex', p: 0, gap: 1 }}>
          {/* Product Image */}
          <Box sx={{ position: 'relative', flexShrink: 0 }}>
            <Box
              component="img"
              src={product.images[0]}
              alt={product.name}
              sx={{
                width: 140,
                height: 140,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
            
            {/* Favorite Button Overlay */}
            {onFavoriteClick && (
              <IconButton
                onClick={handleFavoriteClick}
                onMouseDown={handleFavoriteMouseDown}
                onTouchStart={handleFavoriteTouchStart}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
                  '&:hover': {
                    backgroundColor: (theme) => alpha(theme.palette.background.paper, 1),
                  },
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

            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <Chip
                label={`-${discountPercentage}%`}
                color="error"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 4,
                  left: 4,
                }}
              />
            )}
          </Box>

          {/* Product Info */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.25 }}>
            {/* Product Name */}
            <Typography
              variant="subtitle1"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {product.name}
            </Typography>

            {/* Condition and Brand */}
            <Typography variant="body2" color="text.secondary">
              {product.condition === 'new' ? 'Brand New' : 
               product.condition === 'used' ? 'Open Box' : 'Refurbished'}
              {product.brand && ` • ${product.brand}`}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Rating value={product.rating} precision={0.1} size="small" readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.reviewCount})
              </Typography>
            </Box>

            {/* Price */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, mb: 0.25 }}>
              <Typography
                variant="h6"
              >
                ${product.price.toFixed(2)}
              </Typography>
              {product.originalPrice && (
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    textDecoration: 'line-through',
                    color: 'text.secondary',
                  }}
                >
                  ${product.originalPrice.toFixed(2)}
                </Typography>
              )}
            </Box>

            {/* Shipping Info */}
            <Typography variant="body2" color="text.secondary">
              {product.shipping.free ? 'Envío gratis' : `+$${product.shipping.cost} envío`}
            </Typography>

            {/* Sold Count */}
            <Typography variant="body2" color="text.secondary">
              {Math.floor(Math.random() * 50)} vendidos
            </Typography>

            {/* Add to Cart Button */}
            {/* {onAddToCart && (
              <Button
                variant="contained"
                size='medium'
                onClick={handleAddToCart}
                onMouseDown={handleAddToCartMouseDown}
                onTouchStart={handleAddToCartTouchStart}
                sx={{
                  borderRadius: 999,
                  mt: 1
                }}
              >
                Agregar al carrito
              </Button>
            )} */}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default DetailedProductCard;