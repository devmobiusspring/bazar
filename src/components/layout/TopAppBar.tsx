"use client";
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material';
import {
  ArrowBack,
  SearchRounded,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

interface TopAppBarProps {
  title?: string;
  showSearch?: boolean;
  showBack?: boolean;
  onSearchClick?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
}

const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  showSearch = true,
  showBack = false,
  onSearchClick,
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);


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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() && onSearchSubmit) {
      onSearchSubmit(searchValue.trim());
    }
  };



  const isSearchPage = pathname === '/search';
  const isSubPage = pathname !== '/' && pathname !== '/search';
  const hasBackButton = showBack || isSubPage;

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'background.default',
        backgroundImage: 'none',
        color: 'text.primary',
        borderBottom: 'none',
        boxShadow: 'none',
      }}
    >
      <Box sx={{ 
        px: hasBackButton ? 1 : 2, 
        py: { xs: 1, md: 2 }
      }}>
        <Box sx={{ display: 'flex', gap: 0.25, alignItems: 'center' }}>
          {/* Optional Back Button for Sub Pages */}
          {hasBackButton ? (
            <IconButton
              onClick={handleBack}
              size='medium'
            >
              <ArrowBack />
            </IconButton>
          ) : null}

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1 }}>
            {title ? (
              <Typography variant="h6" component="h1">
                {title}
              </Typography>
            ) : showSearch && !isSearchPage ? (
              // Default State - TextField with search appearance
              <TextField
                placeholder="Buscar en Bazar"
                variant="filled"
                size="small"
                onClick={onSearchClick || (() => router.push('/search'))}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
                sx={{
                  width: '100%',
                  '& .MuiFilledInput-root': {
                    borderRadius: '999px !important',
                  },
                }}
              />
            ) : isSearchPage ? (
              // Search State - Active search
              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{ width: '100%' }}
              >
                <TextField
                  placeholder="Buscar en Bazar"
                  variant="filled"
                  size="small"
                  value={searchValue}
                  onChange={(e) => {
                    onSearchChange?.(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRounded sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                  sx={{
                    width: '100%',
                    '& .MuiFilledInput-root': {
                      borderRadius: '999px !important',
                    },
                  }}
                  autoFocus
                />
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};

export default TopAppBar;
