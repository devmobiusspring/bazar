import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Badge,
} from '@mui/material';
import {
  ArrowBack,
  Search,
  ShoppingCart,
  Menu,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCartItemCount } from '../../services/cartService';

interface TopAppBarProps {
  title?: string;
  showSearch?: boolean;
  showBack?: boolean;
  showCart?: boolean;
  onSearchClick?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
}

const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  showSearch = true,
  showBack = false,
  showCart = true,
  onSearchClick,
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setCartItemCount(getCartItemCount());
    
    // Listen for cart changes
    const handleStorageChange = () => {
      setCartItemCount(getCartItemCount());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() && onSearchSubmit) {
      onSearchSubmit(searchValue.trim());
    }
  };

  const isSearchPage = location.pathname === '/search';

  return (
    <AppBar
      position="sticky"
      variant="dense"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: scrolled ? 1 : 0,
        transition: 'box-shadow 0.2s ease-in-out',
      }}
    >
      <Toolbar sx={{ minHeight: 56 }}>
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          {showBack ? (
            <IconButton
              edge="start"
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              <ArrowBack />
            </IconButton>
          ) : (
            <IconButton edge="start" sx={{ mr: 1 }}>
              <Menu />
            </IconButton>
          )}
        </Box>

        {/* Center Section */}
        <Box sx={{ flexGrow: 1 }}>
          {title ? (
            <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          ) : showSearch && !isSearchPage ? (
            <Box
              onClick={onSearchClick || (() => navigate('/search'))}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'action.hover',
                borderRadius: 3,
                px: 2,
                py: 1,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <Search sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ flexGrow: 1 }}
              >
                Buscar en Bazar Digital
              </Typography>
            </Box>
          ) : isSearchPage ? (
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'action.hover',
                borderRadius: 3,
                px: 2,
                py: 1,
              }}
            >
              <Search sx={{ mr: 1, color: 'text.secondary' }} />
              <InputBase
                placeholder="Buscar en Bazar Digital"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                sx={{
                  flexGrow: 1,
                  '& input': {
                    padding: 0,
                  },
                }}
                autoFocus
              />
            </Box>
          ) : null}
        </Box>

        {/* Right Section */}
        {showCart && (
          <IconButton onClick={handleCartClick} sx={{ ml: 1 }}>
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;