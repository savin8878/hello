import { createTheme, ThemeProvider } from '@mui/material/styles';
export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#18181B', // Custom primary color
      },
      secondary: {
        main: '#ff5722', // Custom secondary color
      },
      view: {
        main: '#47B8F5', // Custom secondary color
      },
      approve: {
        main: '#7DC551', // Custom secondary color
      },
      reject: {
        main: '#F85D5D', // Custom secondary color
      },
      query: {
        main: '#FFC527', // Custom secondary color
      },
      background: {
        default: '#ffffff',
        card: '#ffffff', // Custom background color for light theme
        paper: '#f5f5f5', // Custom surface color for light theme
        lines: 'linear-gradient(to right,#4f4f4f2e 1px,transparent 1px),linear-gradient(to bottom,#8080800a 1px,transparent 1px), radial-gradient(black 1px, transparent 0) -19px -19px/40px 40px',
      },
      // Add more customizations as needed
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });
  