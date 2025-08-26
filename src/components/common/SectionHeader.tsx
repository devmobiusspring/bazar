import React from 'react';
import { Box, Typography, Link } from '@mui/material';

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
        <Link
          variant="body1"
          color="inherit"
          onClick={onViewAll}
        >
          Ver todos
        </Link>
      )}
    </Box>
  );
};

export default SectionHeader;