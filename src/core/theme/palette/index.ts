// ** Type Imports
import { PaletteMode, PaletteOptions as _PaletteOptions } from "@mui/material";

// interface PaletteOptions extends _PaletteOptions {
//   dividerDark?: string;
// }
type PaletteOptions = _PaletteOptions & {
  dividerDark?: string;
};

const DefaultPalette = (mode: PaletteMode): PaletteOptions => {
  if (mode === "light") {
    return {
      mode: "light",
      common: {
        black: "#000",
        white: "#fff",
      },
      primary: {
        main: "#C03632",
        dark: "#A32822",
        light: "#EA5147",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#2E2F34",
        dark: "#1B1C20",
        light: "#505157",
        contrastText: "#FFFFFF",
      },
      error: {
        main: "#D32F2F",
        light: "#EF5350",
        dark: "#C62828",
        contrastText: "#FFFFFF",
      },
      warning: {
        main: "#EF6C00",
        light: "#FF9800",
        dark: "#E65100",
        contrastText: "#FFFFFF",
      },
      info: {
        main: "#FFFFFF",
        dark: "#F2F2F2",
        light: "#FBFBFB",
        contrastText: "#2E2F34",
      },
      success: {
        main: "#2E7D32",
        light: "#4CAF50",
        dark: "#1B5E20",
        contrastText: "#FFFFFF",
      },
      text: {
        primary: "#2E2F34",
        secondary: "rgba(46, 47, 52, 0.7)",
        disabled: "#B0B1B7",
      },
      divider: "#EDEEF4",
      dividerDark: "#E1E1E1",
      background: {
        paper: "#F2F2F6",
        default: "#F2F2F6",
      },
      action: {
        active: "rgba(46, 47, 52, 0.56)",
        hover: "rgba(46, 47, 52, 0.04)",
        hoverOpacity: 0.04,
        selected: "rgba(46, 47, 52, 0.08)",
        selectedOpacity: 0.08,
        focus: "rgba(46, 47, 52, 0.12)",
        focusOpacity: 0.12,
        disabled: "rgba(46, 47, 52, 0.38)",
        disabledOpacity: 0.38,
        disabledBackground: "rgba(46, 47, 52, 0.12)",
      },
    };
  } else {
    // not yet final
    return {
      mode: "dark",
      common: {
        black: "#000",
        white: "#fff",
      },
      primary: {
        main: "#90CAF9",
        dark: "#A32822",
        light: "#EA5147",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      secondary: {
        main: "#CE93D8",
        dark: "#1B1C20",
        light: "#505157",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      error: {
        main: "#F44336",
        light: "#E57373",
        dark: "#D32F2F",
        contrastText: "#FFFFFF",
      },
      warning: {
        main: "#FFA726",
        light: "#FF9800",
        dark: "#E65100",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      info: {
        main: "#FFFFFF",
        dark: "#F2F2F2",
        light: "#FBFBFB",
        contrastText: "#2E2F34",
      },
      success: {
        main: "#2E7D32",
        light: "#4CAF50",
        dark: "#1B5E20",
        contrastText: "#FFFFFF",
      },
      text: {
        primary: "#2E2F34",
        secondary: "rgba(46, 47, 52, 0.7)",
        disabled: "#B0B1B7",
      },
      divider: "#EDEEF4",
      dividerDark: "#E1E1E1",
      background: {
        paper: "#121212",
        default: "#121212",
      },
      action: {
        active: "rgba(46, 47, 52, 0.56)",
        hover: "rgba(46, 47, 52, 0.04)",
        hoverOpacity: 0.04,
        selected: "rgba(46, 47, 52, 0.08)",
        selectedOpacity: 0.08,
        focus: "rgba(46, 47, 52, 0.12)",
        focusOpacity: 0.12,
        disabled: "rgba(46, 47, 52, 0.38)",
        disabledOpacity: 0.38,
        disabledBackground: "rgba(46, 47, 52, 0.12)",
      },
    };
  }
};

export default DefaultPalette;
