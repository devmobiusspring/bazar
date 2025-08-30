"use client";
import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Button,
} from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';

interface ShippingInfoDialogProps {
  open: boolean;
  onClose: () => void;
}

const ShippingInfoDialog: React.FC<ShippingInfoDialogProps> = ({ 
  open, 
  onClose 
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: fullScreen ? 0 : 2,
        },
      }}
    >
      <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: "1px solid", borderBottomColor: 'divider' }}>
        <Typography variant='h6'>
          Envío y políticas
        </Typography>
        <IconButton onClick={onClose} edge='end'>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ p: 0 }} >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}>
          
          {/* Shipping Time Section */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Listo para enviar en
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              1-3 días hábiles
            </Typography>
          </Box>

          {/* Ships From Section */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Envío desde
            </Typography>
            <Typography variant="h6">
              Guatemala, Zona 15
            </Typography>
          </Box>

          {/* Shipping Cost Section */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Costo de envío
            </Typography>
            <Typography variant="h6">
              Grátis
            </Typography>
          </Box>

          {/* Returns Section */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Devoluciones e intercambios
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Aceptado
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Los compradores son responsables de los costos de envío de devolución. Si el artículo no se devuelve en su condición original, el comprador es responsable de cualquier pérdida en valor.
            </Typography>
          </Box>

          {/* Return Window Section */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Ventana de devolución e intercambio
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              30 días
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tienes 30 días desde la entrega del artículo para enviar este artículo de vuelta al vendedor.
            </Typography>
          </Box>

        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ShippingInfoDialog;