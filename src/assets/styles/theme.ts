import { ThemeOptions } from '@mui/material/styles';

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#ff4081',
          },
          background: {
            default: '#ffffff',
            paper: '#f5f5f5',
          },
        }
      : {
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#f48fb1',
          },
          background: {
            default: '#121212',
            paper: '#1d1d1d',
          },
        }),
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '--primary-color': mode === 'light' ? '#1976d2' : '#90caf9',
          '--secondary-color': mode === 'light' ? '#ff4081' : '#f48fb1',
          '--background-color': mode === 'light' ? '#ffffff' : '#121212',
          '--text-color': mode === 'light' ? '#000000' : '#ffffff',
          backgroundColor: 'var(--background-color)',
          color: 'var(--text-color)',
          transition: 'background-color 0.3s, color 0.3s',
        },
        a: {
          color: 'var(--primary-color)',
          textDecoration: 'none',
        },
      },
    },
  },
});
