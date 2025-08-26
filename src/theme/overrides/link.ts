// ** MUI Imports
import { Theme } from "@mui/material/styles";

const Link = (theme: Theme) => {
  return {
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
        },
      },
    },
  };
};

export default Link;