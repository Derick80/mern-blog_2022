import { Container, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactNode } from 'react'

import Navbar from './Navbar'

type Props = {
  children: ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container sx={{ flexGrow: 1, maxWidth: '100%' }}>
      <Navbar />

      <Grid container spacing={5} sx={{ mt: 3 }}>{children}</Grid>
    </Container>
  )
}

export default Layout
