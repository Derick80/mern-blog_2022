import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#2d2e35',
      light: '#3378AF',
      dark: '#003C6C',
    },
    secondary: {
      main: '#546e7a',
    },
    error: {
      main: '#e53935',
      light: '#ff9800',
      dark: '#e65100',
    },
    background: {
      default: '#f5f5f5',
      paper: 'rgba(87,87,93,0.66)',
    },
    success: {
      main: '#16FA6E',
      light: '#15ED68',
      dark: '#10AD4C',
    },
    warning: {
      main: '#FFCD69',
      light: '#E8BA5F',
      dark: '#C49A4E',
    },
    info: {
      main: '#87D1FF',
      light: '#A1DBFF',
      dark: '#4D8BB3',
    },
  },
})

theme = responsiveFontSizes(theme)
export default theme
