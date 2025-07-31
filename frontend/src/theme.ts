import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "system-ui", "Avenir", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          fontFamily: '"Inter", "system-ui", "Avenir", "Helvetica", "Arial", sans-serif',
          fontSynthesis: 'none',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        body: {
          margin: 0,
          padding: 0,
          fontFamily: '"Inter", "system-ui", "Avenir", "Helvetica", "Arial", sans-serif',
          color: '#333',
          backgroundColor: '#fff',
        },
        p: {
          marginBottom: '1rem',
          fontSize: '1rem',
          lineHeight: 1.6,
        },
        a: {
          color: '#1e8fff',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
        ul: {
          paddingLeft: '1.5rem',
          marginBottom: '1rem',
        },
        li: {
          marginBottom: '0.5rem',
        },
        h1: {
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '1rem',
        },
        h2: {
          fontSize: '1.75rem',
          fontWeight: 600,
          marginBottom: '0.875rem',
        },
        h3: {
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '0.75rem',
        },
        h4: {
          fontSize: '1.25rem',
          fontWeight: 500,
          marginBottom: '0.75rem',
        },
        h5: {
          fontSize: '1rem',
          fontWeight: 500,
          marginBottom: '0.5rem',
        },
        h6: {
          fontSize: '0.875rem',
          fontWeight: 500,
          marginBottom: '0.5rem',
        },
        button: {
          fontWeight: 'bold',
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
