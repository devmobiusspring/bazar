import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Person,
  ShoppingBag,
  Favorite,
  LocationOn,
  AccountBalanceWallet,
  Settings,
  ExitToApp,
  ChevronRight,
  Edit,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { User } from '../types';
import { getCurrentUser } from '../services/userService';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      icon: <Person />,
      title: 'Mi perfil',
      subtitle: 'Información personal',
      path: '/profile/edit',
    },
    {
      icon: <ShoppingBag />,
      title: 'Mis pedidos',
      subtitle: 'Historial de compras',
      path: '/profile/orders',
    },
    {
      icon: <Favorite />,
      title: 'Favoritos',
      subtitle: 'Productos guardados',
      path: '/profile/favorites',
    },
    {
      icon: <LocationOn />,
      title: 'Direcciones',
      subtitle: 'Direcciones de envío',
      path: '/profile/addresses',
    },
    {
      icon: <AccountBalanceWallet />,
      title: 'Billetera',
      subtitle: 'Métodos de pago',
      path: '/profile/wallet',
    },
    {
      icon: <Settings />,
      title: 'Configuración',
      subtitle: 'Preferencias de la app',
      path: '/profile/settings',
    },
  ];

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens
    console.log('Logging out...');
  };

  if (loading) {
    return (
      <Box>
        <TopAppBar title="Perfil" />
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <LoadingSkeleton variant="text" height={100} />
          <LoadingSkeleton variant="text" count={6} />
        </Container>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box>
        <TopAppBar title="Perfil" />
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Typography variant="h6">Error al cargar el perfil</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <TopAppBar title="Perfil" />

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* User Info Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={user.avatar}
                sx={{ width: 80, height: 80 }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {user.email}
                </Typography>
                {user.phone && (
                  <Typography variant="body2" color="text.secondary">
                    {user.phone}
                  </Typography>
                )}
              </Box>
              <IconButton onClick={() => navigate('/profile/edit')}>
                <Edit />
              </IconButton>
            </Box>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card>
          <List sx={{ p: 0 }}>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.path}>
                <ListItem
                  button
                  onClick={() => handleMenuItemClick(item.path)}
                  sx={{ py: 2 }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    secondary={item.subtitle}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <ChevronRight color="action" />
                </ListItem>
                {index < menuItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            
            <Divider />
            
            {/* Logout */}
            <ListItem
              button
              onClick={handleLogout}
              sx={{ py: 2, color: 'error.main' }}
            >
              <ListItemIcon>
                <ExitToApp color="error" />
              </ListItemIcon>
              <ListItemText
                primary="Cerrar sesión"
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItem>
          </List>
        </Card>
      </Container>
    </Box>
  );
};

export default ProfilePage;