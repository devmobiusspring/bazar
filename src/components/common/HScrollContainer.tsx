import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface HScrollContainerProps {
  children: React.ReactNode;
  gap?: number | string;
  sx?: SxProps<Theme>;
  noGutter?: boolean;
}

const HScrollContainer: React.FC<HScrollContainerProps> = ({
  children,
  gap = 1,
  sx = {},
  noGutter = false,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap,
        overflowX: 'auto',
        mx: noGutter ? 0 : -2,
        px: 2,
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