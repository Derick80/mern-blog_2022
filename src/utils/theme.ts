import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#E4E2F2',
      light: 'EF0EDFF',
      dark: '#6C6B73',
    },
    secondary: {
      main: '#A8A6B3',
    },
    error: {
      main: '#ED6C02',
      light: '#ff9800',
      dark: '#e65100',
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

export default theme
