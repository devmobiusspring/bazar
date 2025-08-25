// ** MUI Theme Provider
import { ThemeOptions, PaletteMode } from "@mui/material";

// ** Theme Override Imports
import palette from "./palette";
import spacing from "./spacing";
import shadows from "./shadows";
import breakpoints from "./breakpoints";

const themeOptions = (mode: PaletteMode = "light"): ThemeOptions => {
  const options: ThemeOptions = {
    palette: palette(mode),
    shadows: shadows(mode),
    // ...spacing,
    shape: {
      borderRadius: 8,
    },
    breakpoints: breakpoints(),
  };

  return options;
};

export default themeOptions;
