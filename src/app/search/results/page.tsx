"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  Container,
} from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import TopAppBar from '../../../components/layout/TopAppBar';
import ProductListItem from '../../../components/common/ProductListItem';
import LoadingSkeleton from '../../../components/common/LoadingSkeleton';
import EmptyState from '../../../components/common/EmptyState';
import { SearchResult } from '../../../types';
import { searchProducts } from '../../../services/productService';
import { addToCart } from '../../../services/cartService';
import { toggleFavoriteProduct, getFavoriteProducts } from '../../../services/userService';

const SearchResultsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchValue, setSearchValue] = useState(query);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Box>
      <TopAppBar
        showBack
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <Container maxWidth="lg">
        {loading ? (
          // Loading state
          <LoadingSkeleton variant="product-list" count={5} />
        ) : searchResults && searchResults.products.length > 0 ? (
          // Search results
          <Box sx={{ py: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
              {searchResults.total} resultados para "{query}"
            </Typography>
            
            <List sx={{ p: 0 }}>
              {searchResults.products.map((product) => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                  onFavoriteClick={handleFavoriteClick}
                  onAddToCart={handleAddToCart}
                  isFavorite={favoriteProducts.includes(product.id)}
                />
              ))}
            </List>
          </Box>
        ) : (
          // No results
          <EmptyState
            icon={<SearchRounded />}
            title="No encontramos resultados"
            description={`No encontramos resultados para "${query}". Intenta con otras palabras clave.`}
          />
        )}
      </Container>
    </Box>
  );
};

export default SearchResultsPage;