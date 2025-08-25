import React from 'react';
import { Box, Typography } from '@mui/material';

interface SectionHeaderProps {
  title: string;
  onViewAll?: () => void;
  showViewAll?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  onViewAll, 
  showViewAll = true 
}) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center'
    }}>
      <Typography 
        variant="h5" 
        sx={{ 
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>
      {showViewAll && (
        <Typography
          variant="body2"
          onClick={onViewAll}
          sx={{
            color: 'text.primary',
            textDecoration: 'underline',
            cursor: 'pointer',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          Ver todos
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeader;