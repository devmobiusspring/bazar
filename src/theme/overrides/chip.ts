// ** MUI Imports
import { Theme } from "@mui/material/styles";

const Chip = (theme: Theme) => {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        sizeSmall: {
          height: 24,
          fontSize: '0.75rem',
        },
      },
    },
  };
};

export default Chip;
