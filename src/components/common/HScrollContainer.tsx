import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface HScrollContainerProps {
  children: React.ReactNode;
  gap?: number | string;
  sx?: SxProps<Theme>;
}

const HScrollContainer: React.FC<HScrollContainerProps> = ({
  children,
  gap = 1,
  sx = {},
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap,
        overflowX: 'auto',
        mr: -2,
        pr: 2,
        '&::-webkit-scrollbar': { 
          display: 'none' 
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default HScrollContainer;