import React, { ReactNode } from 'react'

import Navbar from './Navbar'

type Props = {
  children: ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='container'>
      <Navbar />

      <div className='main'>{children}</div>
    </div>
  )
}

export default Layout
