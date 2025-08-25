// ** MUI Imports
import { Theme } from "@mui/material/styles";

const TextField = (theme: Theme) => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 24,
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.87)',
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
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
