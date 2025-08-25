// ** Type Imports
import { PaletteMode, PaletteOptions as _PaletteOptions } from "@mui/material";

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
        main: "#407352",
        light: "#659074",
        dark: "#1D4036",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#2E2F34",
        light: "#505157",
        dark: "#1B1C20",
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
        main: "#0288D1",
        dark: "#0277BD",
        light: "#03DAC6",
        contrastText: "#FFFFFF",
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
      divider: "#E0E0E0",
      dividerDark: "#E1E1E1",
      background: {
        paper: "#ffffff",
        default: "#FFFFFF",
      },
      action: {
        active: "#2E2F34",
        hover: "rgba(0, 0, 0, 0.04)",
        hoverOpacity: 0.04,
        selected: "rgba(0, 0, 0, 0.08)",
        selectedOpacity: 0.08,
        focus: "rgba(0, 0, 0, 0.12)",
        focusOpacity: 0.12,
        disabled: "rgba(0, 0, 0, 0.26)",
        disabledOpacity: 0.38,
        disabledBackground: "rgba(0, 0, 0, 0.12)",
      },
    };
  } else {
    return {
      mode: "dark",
      common: {
        black: "#000",
        white: "#fff",
      },
      primary: {
        main: "#90CAF9",
        dark: "#1565c0",
        light: "#42a5f5",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      secondary: {
        main: "#CE93D8",
        dark: "#9a0036",
        light: "#ff5983",
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
        main: "#29B6F6",
        dark: "#0277BD",
        light: "#03DAC6",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      success: {
        main: "#66BB6A",
        light: "#4CAF50",
        dark: "#1B5E20",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "#B0B1B7",
      },
      divider: "rgba(255, 255, 255, 0.12)",
      dividerDark: "#E1E1E1",
      background: {
        paper: "#121212",
        default: "#121212",
      },
      action: {
        active: "#FFFFFF",
        hover: "rgba(255, 255, 255, 0.04)",
        hoverOpacity: 0.04,
        selected: "rgba(255, 255, 255, 0.08)",
        selectedOpacity: 0.08,
        focus: "rgba(255, 255, 255, 0.12)",
        focusOpacity: 0.12,
        disabled: "rgba(255, 255, 255, 0.38)",
        disabledOpacity: 0.38,
        disabledBackground: "rgba(255, 255, 255, 0.12)",
      },
    };
  }
};

export default DefaultPalette;
