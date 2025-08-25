// ** MUI Imports
import { Theme } from "@mui/material/styles";

const AppBar = (theme: Theme) => {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
      variants: [
        {
          props: { variant: 'dense' },
          style: {
            minHeight: 56,
            '& .MuiToolbar-root': {
              minHeight: 56,
              paddingLeft: 8,
              paddingRight: 8,
            },
          },
        },
      ],
    },
  };
};

export default AppBar;
