'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: '#0f6ca4',
      light: '#6eb8f3',
      dark: '#053b5d',
    },
    secondary: {
      main: '#7ed0ff',
      light: '#b5ecff',
      dark: '#3c9ac7',
    },
    background: {
      default: '#041e34',
      paper: '#072740',
    },
    text: {
      primary: '#f7fbff',
      secondary: '#b8d7eb',
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#041e34',
        },
      },
    },
  },
});

export default theme;
