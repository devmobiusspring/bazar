// ** MUI Imports
import { Theme } from "@mui/material/styles";

const Card = (theme: Theme) => {
  return {
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: 12,
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: '12px 12px 0 0',
        },
      },
    },
  };
};

export default Card;
