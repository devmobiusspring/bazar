// ** Theme Type Import
import { Theme } from '@mui/material/styles';

const Typography = (theme: Theme) => {
  return {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: "3rem",
      [theme.breakpoints.up('md')]: {
        fontSize: "2.75rem",
        lineHeight: "3.25rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "3rem",
        lineHeight: "3.5rem"
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: "3.5rem",
        lineHeight: "4rem"
      }
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: "2.5rem",
      [theme.breakpoints.up('md')]: {
        fontSize: "2.25rem",
        lineHeight: "2.75rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "2.5rem",
        lineHeight: "3rem"
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: "2.75rem",
        lineHeight: "3.25rem"
      }
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: "2.25rem",
      [theme.breakpoints.up('md')]: {
        fontSize: "1.875rem",
        lineHeight: "2.375rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "2rem",
        lineHeight: "2.5rem"
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: "2.125rem",
        lineHeight: "2.625rem"
      }
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: "2rem",
      [theme.breakpoints.up('md')]: {
        fontSize: "1.5625rem",
        lineHeight: "2.0625rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "1.625rem",
        lineHeight: "2.125rem"
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: "1.6875rem",
        lineHeight: "2.1875rem"
      }
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: "1.625rem",
      [theme.breakpoints.up('md')]: {
        fontSize: "1.3125rem",
        lineHeight: "1.6875rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "1.375rem",
        lineHeight: "1.75rem"
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: "1.4375rem",
        lineHeight: "1.875rem"
      }
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: "1.5rem",
      [theme.breakpoints.up('lg')]: {
        fontSize: "1.1875rem",
        lineHeight: "1.5625rem"
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: "1.25rem",
        lineHeight: "1.625rem"
      }
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: "1.375rem",
      [theme.breakpoints.up('lg')]: {
        fontSize: "1.0625rem",
        lineHeight: "1.4375rem"
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: "1.125rem",
        lineHeight: "1.5rem"
      }
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "1.25rem",
      [theme.breakpoints.up('lg')]: {
        fontSize: "0.9375rem",
        lineHeight: "1.3125rem"
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: "1rem",
        lineHeight: "1.375rem"
      }
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      [theme.breakpoints.up('lg')]: {
        fontSize: "1.0625rem",
        lineHeight: 1.53
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: "1.125rem",
        lineHeight: 1.56
      }
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
      [theme.breakpoints.up('lg')]: {
        fontSize: "0.9375rem",
        lineHeight: 1.46
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: "1rem",
        lineHeight: 1.5
      }
    },
    overline: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
      textTransform: "uppercase",
      [theme.breakpoints.up('lg')]: {
        fontSize: "0.8125rem",
        lineHeight: "1.0625rem"
      }
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.33,
      [theme.breakpoints.up('xl')]: {
        fontSize: "0.8125rem",
        lineHeight: 1.36
      }
    }
  }
}

export default Typography
