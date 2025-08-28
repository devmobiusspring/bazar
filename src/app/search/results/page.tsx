"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  KeyboardArrowDownRounded,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import TopAppBar from '../../../components/layout/TopAppBar';
import DetailedProductCard from '../../../components/common/DetailedProductCard';
import LoadingSkeleton from '../../../components/common/LoadingSkeleton';
import { SearchResult, Product } from '../../../types';
import { searchProducts, getRecommendedProducts } from '../../../services/productService';
import { addToCart } from '../../../services/cartService';
import { toggleFavoriteProduct, getFavoriteProducts } from '../../../services/userService';

const SearchResultsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [searchValue, setSearchValue] = useState(query);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter dropdown states
  const [priceAnchorEl, setPriceAnchorEl] = useState<null | HTMLElement>(null);
  const [conditionAnchorEl, setConditionAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const [selectedConditionIndex, setSelectedConditionIndex] = useState(0);
  
  useEffect(() => {
    if (query) {
      setSearchValue(query);
      performSearch(query);
    } else {
      router.push('/search');
    }
  }, [query]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favorites = await getFavoriteProducts('1');
      setFavoriteProducts(favorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);

    try {
      const results = await searchProducts(searchQuery);
      setSearchResults(results);

      // If no results found, load recommended products
      if (results.products.length === 0) {
        const recommended = await getRecommendedProducts();
        setRecommendedProducts(recommended);
      }

      // Add to recent searches
      const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const updated = [searchQuery, ...recent.filter((s: string) => s !== searchQuery)].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (searchQuery: string) => {
    router.push(`/search/results?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleFavoriteClick = async (productId: string) => {
    try {
      const isFavorite = await toggleFavoriteProduct('1', productId);
      if (isFavorite) {
        setFavoriteProducts([...favoriteProducts, productId]);
      } else {
        setFavoriteProducts(favoriteProducts.filter(id => id !== productId));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    // Trigger storage event to update cart count
    window.dispatchEvent(new Event('storage'));
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  // Filter options
  const priceOptions = [
    'Relevante',
    'Precio más bajo', 
    'Precio más alto',
    'Mejor oferta'
  ];
  
  const conditionOptions = [
    'Nuevo',
    'Como nuevo',
    'Usado'
  ];

  // Menu handlers
  const handlePriceClick = (event: React.MouseEvent<HTMLElement>) => {
    setPriceAnchorEl(event.currentTarget);
  };

  const handleConditionClick = (event: React.MouseEvent<HTMLElement>) => {
    setConditionAnchorEl(event.currentTarget);
  };

  const handlePriceMenuItemClick = (index: number) => {
    setSelectedPriceIndex(index);
    setPriceAnchorEl(null);
  };

  const handleConditionMenuItemClick = (index: number) => {
    setSelectedConditionIndex(index);
    setConditionAnchorEl(null);
  };

  const handleMenuClose = () => {
    setPriceAnchorEl(null);
    setConditionAnchorEl(null);
  };
  const searchChips = [
    {
      label: 'Precio',
      value: 'price',
      icon: <KeyboardArrowDownRounded />,
      onClick: handlePriceClick,
    },
    {
      label: 'Condición',
      value: 'condition',
      icon: <KeyboardArrowDownRounded />,
      onClick: handleConditionClick,
    },
  ];

  return (
    <Box>
      <TopAppBar
        showBack
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        chips={searchChips}
      />

      <Container maxWidth='lg' sx={{ py: 1 }}>
        {loading ? (
          // Loading state
          <LoadingSkeleton variant="product-list" count={5} />
        ) : searchResults && searchResults.products.length > 0 ? (
          // Search results
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              {searchResults.total} resultados para "{query}"
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mx: -2 }}>
              {searchResults.products.map((product) => (
                <DetailedProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                  onFavoriteClick={handleFavoriteClick}
                  onAddToCart={handleAddToCart}
                  isFavorite={favoriteProducts.includes(product.id)}
                />
              ))}
            </Box>
          </Box>
        ) : (
          // No results with recommendations
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" color='text.secondary'>
              No encontramos resultados para "{query}"
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6">
                Recomendado
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', mx: -2 }}>
                {recommendedProducts.map((product) => (
                  <DetailedProductCard
                    key={product.id}
                    product={product}
                    onProductClick={handleProductClick}
                    onFavoriteClick={handleFavoriteClick}
                    onAddToCart={handleAddToCart}
                    isFavorite={favoriteProducts.includes(product.id)}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Container>

      {/* Price Filter Menu */}
      <Menu
        anchorEl={priceAnchorEl}
        open={Boolean(priceAnchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          role: 'listbox',
        }}
      >
        {priceOptions.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedPriceIndex}
            onClick={() => handlePriceMenuItemClick(index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>

      {/* Condition Filter Menu */}
      <Menu
        anchorEl={conditionAnchorEl}
        open={Boolean(conditionAnchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          role: 'listbox',
        }}
      >
        {conditionOptions.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedConditionIndex}
            onClick={() => handleConditionMenuItemClick(index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SearchResultsPage;