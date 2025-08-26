"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItemText,
  Container,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
import { SearchRounded, HistoryRounded } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import TopAppBar from '../../components/layout/TopAppBar';

const SearchPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchValue, setSearchValue] = useState(query);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query) {
      // Redirect to results page if there's a query
      router.push(`/search/results?q=${encodeURIComponent(query)}`);
    }
  }, [query]);


  const handleSearchSubmit = (searchQuery: string) => {
    router.push(`/search/results?q=${encodeURIComponent(searchQuery)}`);
  };


  const handleRecentSearchClick = (searchQuery: string) => {
    router.push(`/search/results?q=${encodeURIComponent(searchQuery)}`);
  };

  const getStoredRecentSearches = () => {
    return JSON.parse(localStorage.getItem('recentSearches') || '[]');
  };

  const generateAutocompleteSuggestions = (input: string): string[] => {
    if (!input.trim()) return [];
    
    const mockSuggestions = [
      'small water flosser',
      'small water flosser for teeth',
      'small water flossers for teeth travel',
      'small water flosser for travel',
      'small water flosser mini',
      'small water flosser for kids',
      'small water flossers for teeth travel',
      'small water flosser for teeth',
      'small water flosser cordless',
      'small water flosser rechargeable'
    ];
    
    return mockSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(input.toLowerCase()) && 
        suggestion.toLowerCase() !== input.toLowerCase()
      )
      .slice(0, 8);
  };

  const getFilteredRecentSearches = (input: string): string[] => {
    if (!input.trim()) return getStoredRecentSearches();
    
    return getStoredRecentSearches().filter((search: string) =>
      search.toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (value.trim()) {
      setAutocompleteSuggestions(generateAutocompleteSuggestions(value));
    } else {
      setAutocompleteSuggestions([]);
    }
  };

  return (
    <Box>
      <TopAppBar
        showBack
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <Container maxWidth="lg" sx={{ p: 0}}>
        <List sx={{ p: 0}}>
          {/* Recent Searches - filtered by current input */}
          {getFilteredRecentSearches(searchValue).map((search: string, index: number) => (
            <ListItemButton
              key={`recent-${index}`}
              onClick={() => handleRecentSearchClick(search)}
            >
              <ListItemIcon>
                <HistoryRounded />
              </ListItemIcon>
              <ListItemText primary={search} />
            </ListItemButton>
          ))}

          {/* Autocomplete Suggestions */}
          {autocompleteSuggestions.map((suggestion: string, index: number) => (
            <ListItemButton
              key={`suggestion-${index}`}
              onClick={() => handleRecentSearchClick(suggestion)}
            >
              <ListItemIcon>
                <SearchRounded />
              </ListItemIcon>
              <ListItemText primary={suggestion} />
            </ListItemButton>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default SearchPage;
