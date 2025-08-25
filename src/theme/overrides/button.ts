// ** MUI Imports
import { Theme } from "@mui/material/styles";

const Button = (theme: Theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          minHeight: 44,
          textTransform: "none",
          fontWeight: 500,
          '& .MuiButton-startIcon': {
            marginRight: theme.spacing(0.5)
          },
          "& .MuiButton-endIcon": {
            marginLeft: theme.spacing(0.5),
            marginRight: 0,
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        sizeLarge: {
          padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
          fontSize: "0.875rem",
          lineHeight: "1.25rem"
        },
        sizeMedium: {
          fontSize: "0.75rem",
          lineHeight: "1rem",
          padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
          "&.MuiButton-text": {
            padding: `${theme.spacing(0.75)} ${theme.spacing(1)}`,
          }
        },
        sizeSmall: {
          fontSize: "0.6875rem",
          lineHeight: "0.8125rem",
        }
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  };
};

export default Button;
