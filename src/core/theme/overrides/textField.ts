// ** MUI Imports
import { Theme } from "@mui/material/styles";

const TextField = (theme: Theme) => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-inputSizeSmall": {
            padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
            "&::placeholder": {
              opacity: 0.7
            },
            "&.MuiInputBase-inputAdornedStart": {
              paddingLeft: 0
            },
            "&.MuiInputBase-inputAdornedEnd": {
              paddingRight: 0
            }
          },
          "& .MuiInputAdornment-sizeSmall": {
            marginTop: "0 !important"
          }
        }
      }
    },
  };
};

export default TextField;
