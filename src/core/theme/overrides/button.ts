// ** MUI Imports
import { Theme } from "@mui/material/styles";

const Button = (theme: Theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          '& .MuiButton-startIcon': {
            marginRight: theme.spacing(0.5)
          },
          "& .MuiButton-endIcon": {
            marginLeft: theme.spacing(0.5),
            marginRight: 0,
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
