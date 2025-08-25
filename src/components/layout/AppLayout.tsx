import React, { useState } from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Home,
  Store,
  ShoppingCart,
  Person,
  Sell,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBottomNavValue = () => {
    const path = location.pathname;
    if (path === '/' || path.startsWith('/home')) return 0;
    if (path.startsWith('/shops')) return 1;
    if (path.startsWith('/cart')) return 2;
    if (path.startsWith('/profile')) return 3;
    if (path.startsWith('/sell')) return 4;
    return 0;
  };

  const [bottomNavValue, setBottomNavValue] = useState(getBottomNavValue());

  const handleBottomNavChange = (event: React.SyntheticEvent, newValue: number) => {
    setBottomNavValue(newValue);
    
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/shops');
        break;
      case 2:
        navigate('/cart');
        break;
      case 3:
        navigate('/profile');
        break;
      case 4:
        navigate('/sell');
        break;
    }
  };

  // Hide bottom navigation on certain pages
  const hideBottomNav = location.pathname.includes('/search') || 
                       location.pathname.includes('/checkout') ||
                       location.pathname.includes('/product/');

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
          }}
        >
          <BottomNavigationAction
            label="Inicio"
            icon={<Home />}
          />
          <BottomNavigationAction
            label="Tiendas"
            icon={<Store />}
          />
          <BottomNavigationAction
            label="Carrito"
            icon={<ShoppingCart />}
          />
          <BottomNavigationAction
            label="Perfil"
            icon={<Person />}
          />
          <BottomNavigationAction
            label="Vender"
            icon={<Sell />}
          />
        </BottomNavigation>
      )}
    </Box>
  );
};

export default AppLayout;