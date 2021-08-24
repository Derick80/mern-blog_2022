import React, { ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <div className='App'>
    <Navbar />
    <div className='main'>{props.children}</div>
    <Footer />
  </div>
)

export default Layout
