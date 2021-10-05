import { Container, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactNode } from 'react'



type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <Container sx={{ flexGrow: 1, maxWidth: '100%' }}>


      <Grid container spacing={5} sx={{ mt: 3 }}>{children}</Grid>
    </Container>
  )
}

export default Layout
