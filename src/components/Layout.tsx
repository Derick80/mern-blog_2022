import React, { ReactNode } from 'react'
import Navbar from './Navbar'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <div className='App'>
    <Navbar />
    <div>{props.children}</div>
  </div>
)

export default Layout
