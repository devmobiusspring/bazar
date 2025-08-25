"use client";
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Badge,
  TextField,
} from '@mui/material';
import {
  ArrowBack,
  SearchRounded,
  ShoppingCartRounded,
  MenuRounded,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();
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
    router.back();
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() && onSearchSubmit) {
      onSearchSubmit(searchValue.trim());
    }
  };

  const isSearchPage = pathname === '/search';

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
              <MenuRounded />
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
              onClick={onSearchClick || (() => router.push('/search'))}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(80,81,87,0.08)',
                borderRadius: '999px',
                px: 3,
                py: 2,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(80,81,87,0.12)',
                },
              }}
            >
              <SearchRounded sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ 
                  flexGrow: 1,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0.1px',
                }}
              >
                Buscar en Bazar
              </Typography>
            </Box>
          ) : isSearchPage ? (
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(80,81,87,0.08)',
                borderRadius: '999px',
                px: 3,
                py: 2,
              }}
            >
              <SearchRounded sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
              <InputBase
                placeholder="Buscar en Bazar"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                sx={{
                  flexGrow: 1,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0.1px',
                  '& input': {
                    padding: 0,
                    '&::placeholder': {
                      color: 'rgba(46,47,52,0.7)',
                      opacity: 1,
                    },
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
              <ShoppingCartRounded />
            </Badge>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;