// ** MUI Theme Provider
import { ThemeOptions } from "@mui/material";

// ** Theme Override Imports
import palette from "./palette";
import spacing from "./spacing";
import shadows from "./shadows";
import breakpoints from "./breakpoints";

const themeOptions = (): ThemeOptions => {
  const options: ThemeOptions = {
    palette: palette("light"),
    shadows: shadows("light"),
    // ...spacing,
    shape: {
      borderRadius: 12,
    },
    breakpoints: breakpoints(),
  };

  return options;
};

export default themeOptions;
