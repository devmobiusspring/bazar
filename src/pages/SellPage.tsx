"use client";
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
} from '@mui/material';
import {
  PhotoCameraRounded,
  AddPhotoAlternateRounded,
  CategoryRounded,
  DescriptionRounded,
  AttachMoneyRounded,
  LocalShippingRounded,
  SaveRounded,
} from '@mui/icons-material';
import TopAppBar from '../components/layout/TopAppBar';

const SellPage: React.FC = () => {
  const features = [
    {
      icon: <AddPhotoAlternateRounded />,
      title: 'Crea tu tienda',
      description: 'Configura tu tienda en minutos y comienza a vender',
    },
    {
      icon: <PhotoCameraRounded />,
      title: 'Sube tus productos',
      description: 'Agrega fotos y descripciones de tus productos',
    },
    {
      icon: <LocalShippingRounded />,
      title: 'Gestiona envíos',
      description: 'Configura opciones de envío y seguimiento',
    },
    {
      icon: <SaveRounded />,
      title: 'Aumenta tus ventas',
      description: 'Usa nuestras herramientas para hacer crecer tu negocio',
    },
  ];

  return (
    <Box>
      <TopAppBar title="Vender" />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Comienza a vender en Bazar Digital
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Únete a miles de vendedores que ya están creciendo su negocio con nosotros.
            Es fácil, rápido y seguro.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Crear mi tienda
          </Button>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                      color: 'primary.main',
                    }}
                  >
                    {React.cloneElement(feature.icon, { fontSize: 'large' })}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Benefits Section */}
        <Card sx={{ p: 4, backgroundColor: 'primary.main', color: 'white' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
            ¿Por qué vender con nosotros?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Sin comisiones iniciales
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Comienza a vender sin costos iniciales. Solo pagas cuando vendes.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Pagos seguros
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Sistema de pagos protegido con garantía de entrega.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Soporte 24/7
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Te ayudamos en cada paso para hacer crecer tu negocio.
              </Typography>
            </Grid>
          </Grid>
        </Card>

        {/* CTA Section */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            ¿Listo para empezar?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Únete a nuestra comunidad de vendedores exitosos
          </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{ mr: 2 }}
          >
            Más información
          </Button>
          <Button
            variant="contained"
            size="large"
          >
            Registrarme como vendedor
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SellPage;