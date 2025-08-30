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
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ReviewDetails from './ReviewDetails';
import { Review } from '../../types';

interface ReviewDetailDialogProps {
  review: Review | null;
  open: boolean;
  onClose: () => void;
}

const ReviewDetailDialog: React.FC<ReviewDetailDialogProps> = ({ 
  review, 
  open, 
  onClose 
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!review) return null;

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
          Reseña
        </Typography>
        <IconButton onClick={onClose} edge='end'>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ p: 2 }} >
        <ReviewDetails review={review} removePadding />
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDetailDialog;