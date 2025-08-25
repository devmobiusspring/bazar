// ** MUI Imports
import { Theme } from "@mui/material/styles";

const Input = (theme: Theme) => {
  return {
    MuiInputBase: {
      // defaultProps: {
      //   disableUnderline: "true",
      // }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: theme.spacing(1.5) + "!important;",
        },
      },
    },
    ".MuiInputBase-input": {
      borderRadius: theme.spacing(1.5) + "!important;",
    },
  };
};

export default Input;
