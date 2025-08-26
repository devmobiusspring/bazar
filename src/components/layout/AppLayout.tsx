"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  HomeRounded,
  StoreRounded,
  ShoppingCartRounded,
  PersonRounded,
  SellRounded,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const lastScrollY = useRef(0);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);

  const getBottomNavValue = () => {
    if (!pathname) return 0;
    if (pathname === '/' || pathname.startsWith('/home')) return 0;
    if (pathname.startsWith('/shops')) return 1;
    if (pathname.startsWith('/cart')) return 2;
    if (pathname.startsWith('/profile')) return 3;
    if (pathname.startsWith('/sell')) return 4;
    return 0;
  };

  const [bottomNavValue, setBottomNavValue] = useState(getBottomNavValue());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if at bottom of page (within 50px threshold)
      const isAtBottom = currentScrollY + windowHeight >= documentHeight - 50;
      
      if (isAtBottom) {
        // At bottom of page, show navigation
        setIsBottomNavVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setIsBottomNavVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsBottomNavVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBottomNavChange = (event: React.SyntheticEvent, newValue: number) => {
    setBottomNavValue(newValue);
    
    switch (newValue) {
      case 0:
        router.push('/');
        break;
      case 1:
        router.push('/shops');
        break;
      case 2:
        router.push('/cart');
        break;
      case 3:
        router.push('/profile');
        break;
      case 4:
        router.push('/sell');
        break;
    }
  };

  // Hide bottom navigation on certain pages
  const hideBottomNav = !pathname || pathname.includes('/search') || 
                       pathname.includes('/checkout') ||
                       pathname.includes('/product/');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, pb: hideBottomNav ? 0 : 7 }}>
        {children}
      </Box>

      {/* Bottom Navigation */}
      {!hideBottomNav && (
        <BottomNavigation
          value={bottomNavValue}
          onChange={handleBottomNavChange}
          showLabels
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            transform: isBottomNavVisible ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <BottomNavigationAction
            label="Inicio"
            icon={<HomeRounded />}
          />
          <BottomNavigationAction
            label="Tiendas"
            icon={<StoreRounded />}
          />
          <BottomNavigationAction
            label="Carrito"
            icon={<ShoppingCartRounded />}
          />
          <BottomNavigationAction
            label="Perfil"
            icon={<PersonRounded />}
          />
          <BottomNavigationAction
            label="Vender"
            icon={<SellRounded />}
          />
        </BottomNavigation>
      )}
    </Box>
  );
};

export default AppLayout;