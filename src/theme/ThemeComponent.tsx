"use client";
// ** React Imports
import { ReactNode } from "react";

// ** MUI Imports
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// ** Theme Override Imports
import overrides from "./overrides";
import typography from "./typography";

// ** Theme
import themeOptions from "./ThemeOptions";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";

// ** Context Imports
import { useThemeMode } from "@/context/ThemeContext";

// ** Custom Theme Types
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      safeArea: {
        top: string;
        bottom: string;
      };
    };
  }
  
  interface ThemeOptions {
    custom?: {
      safeArea?: {
        top?: string;
        bottom?: string;
      };
    };
  }
}

interface Props {
  children: ReactNode;
}

const ThemeComponent = (props: Props) => {
  const { children } = props;
  const { mode } = useThemeMode();
  const coreThemeConfig = themeOptions(mode);

  // ** Pass ThemeOptions to CreateTheme Function to create partial theme without component overrides
  let theme = createTheme({
    ...coreThemeConfig,
    custom: {
      safeArea: {
        top: 'env(safe-area-inset-top)',
        bottom: 'env(safe-area-inset-bottom)',
      },
    },
  });

  // ** Continue theme creation and pass merged component overrides to CreateTheme function
  theme = createTheme(theme, {
    components: { ...overrides(theme) },
    typography: { ...typography(theme) },
  });

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "miu" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
};

export default ThemeComponent;
