"use client";
import React from 'react';
import {
  AppBar,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Chip,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import {
  ArrowBack,
  SearchRounded,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import HScrollContainer from '../common/HScrollContainer';

interface ChipConfig {
  label: string;
  value: string;
  icon?: React.ReactElement;
  onClick?: (value: string) => void;
}

interface TopAppBarProps {
  title?: string;
  showSearch?: boolean;
  showBack?: boolean;
  onSearchClick?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  chips?: ChipConfig[];
}

const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  showSearch = true,
  showBack = false,
  onSearchClick,
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
  chips,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const trigger = useScrollTrigger({ threshold: 52 });

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
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        color: 'text.primary',
        borderBottom: 'none',
        boxShadow: 'none',
        pointerEvents: 'none'
      }}
    >
      <Box sx={{ 
        px: hasBackButton ? 1 : 2, 
        py: { xs: 1, md: 2 },
        backgroundColor: 'background.default',
        zIndex: 2,
        pointerEvents: 'initial'
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

      {/* Chips Container with Slide Animation */}
      {chips && chips.length > 0 && (
        <Slide in={!trigger}>
          <Box
            sx={{
              px: hasBackButton ? 1 : 2,
              pb: 1,
              backgroundColor: 'background.default',
              pointerEvents: 'initial'
            }}
          >
            <HScrollContainer>
              {chips.map((chip) => (
                <Chip
                  key={chip.value}
                  label={chip.label}
                  icon={chip.icon}
                  onClick={() => chip.onClick?.(chip.value)}
                />
              ))}
            </HScrollContainer>
          </Box>
        </Slide>
      )}
    </AppBar>
  );
};

export default TopAppBar;
