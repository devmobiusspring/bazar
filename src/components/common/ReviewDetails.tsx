"use client";
import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Rating,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from '@mui/material';
import { Review } from '../../types';

interface ReviewDetailsProps {
  review: Review;
  showDivider?: boolean;
  removePadding?: boolean;
}

const ReviewDetails: React.FC<ReviewDetailsProps> = ({ review, showDivider = false, removePadding = false }) => {
  return (
    <Box sx={{ py: removePadding ? 0 : 1 }}>
      <ListItem alignItems="flex-start" sx={{ p: 0, alignItems: 'center' }}>
        <ListItemAvatar sx={{ mt: 0, mr: 1 }}>
          <Avatar sx={{ height: 24, width: 24 }}>
            <Typography variant="subtitle1">
              {review.userName.charAt(0).toUpperCase()}
            </Typography>
          </Avatar>
        </ListItemAvatar>
        
        <ListItemText
          primary={
            <Typography variant="subtitle1">
              {review.userName}
            </Typography>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start" sx={{ p: 0 }}>
        <ListItemText
          primary={
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Rating
                  value={review.rating}
                  size="small"
                  readOnly
                />
                <Typography variant='body2' color="success.main">
                  Compra verificada
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {new Date(review.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>

              <Typography variant="body1">
                {review.comment}
              </Typography>
            </Box>
          }
        />
      </ListItem>
      {showDivider && <Divider sx={{ mt: 1 }} />}
    </Box>
  );
};

export default ReviewDetails;