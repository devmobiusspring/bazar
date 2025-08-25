import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 6,
        px: 3,
      }}
    >
      {icon && (
        <Box sx={{ fontSize: '4rem', mb: 2, opacity: 0.5 }}>
          {icon}
        </Box>
      )}
      
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      
      {description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: 300 }}
        >
          {description}
        </Typography>
      )}
      
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
