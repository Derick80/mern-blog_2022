import React, { ReactNode } from 'react'

import Navbar from './Navbar'

type Props = {
  children: ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='container m-auto'>
      <Navbar />

      <div className='my-10'>{children}</div>
    </div>
  )
}

export default Layout
