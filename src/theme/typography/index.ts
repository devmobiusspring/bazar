// ** Theme Type Import
import { Theme } from '@mui/material/styles';

const Typography = (theme: Theme) => {
  return {
    fontFamily: '"Noto Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.75rem",
      fontWeight: 600,
      lineHeight: "4.5rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "3.875rem",
        lineHeight: "4.625rem"
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "4rem",
        lineHeight: "4.8125rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "4.25rem",
        lineHeight: "4.9375rem"
      }
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 600,
      lineHeight: "3.75rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "3.125rem",
        lineHeight: "3.875rem"
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "3.25rem",
        lineHeight: "4.0625rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "3.375rem",
        lineHeight: "4.1875rem"
      }
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: "2.5rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "2.0625rem",
        lineHeight: "2.5625rem"
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "2.125rem",
        lineHeight: "2.625rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "2.1875rem",
        lineHeight: "2.6875rem"
      }
    },
    h4: {
      fontSize: "1.625rem",
      fontWeight: 600,
      lineHeight: "2rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "1.6875rem",
        lineHeight: "2.0625rem"
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "1.75rem",
        lineHeight: "2.125rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "1.8125rem",
        lineHeight: "2.1875rem"
      }
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: "1.625rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "1.3125rem",
        lineHeight: "1.6875rem"
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "1.375rem",
        lineHeight: "1.75rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "1.4375rem",
        lineHeight: "1.875rem"
      }
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: "1.5rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "1.125rem",
        lineHeight: "1.5rem"
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "1.1875rem",
        lineHeight: "1.5625rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "1.25rem",
        lineHeight: "1.625rem"
      }
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "1.25rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem"
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "0.9375rem",
        lineHeight: "1.3125rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "1rem",
        lineHeight: "1.375rem"
      }
    },
    subtitle2: {
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: "1rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "0.75rem",
        lineHeight: "1rem"
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "0.8125rem",
        lineHeight: "1.0625rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "0.875rem",
        lineHeight: "1.125rem"
      }
    },
    body1: {
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem"
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "0.9375rem",
        lineHeight: "1.3125rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "1rem",
        lineHeight: "1.375rem"
      }
    },
    body2: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "0.75rem",
        lineHeight: "1rem"
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "0.8125rem",
        lineHeight: "1.0625rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "0.875rem",
        lineHeight: "1.125rem"
      }
    },
    overline: {
      fontSize: "0.6875rem",
      textTransform: "uppercase",
      lineHeight: "0.8125rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "0.6875rem",
        lineHeight: "0.8125rem"
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "0.75rem",
        lineHeight: "0.875rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "0.75rem",
        lineHeight: "0.875rem"
      }
    },
    caption: {
      fontSize: "0.6875rem",
      lineHeight: "0.8125rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "0.6875rem",
        lineHeight: "0.8125rem"
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "0.75rem",
        lineHeight: "0.875rem"
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: "0.75rem",
        lineHeight: "0.875rem"
      }
    }
  }
}

export default Typography
