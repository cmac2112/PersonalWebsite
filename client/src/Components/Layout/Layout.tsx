import React from 'react'
import Header from '../Header/Header';

//holy prop drill
interface LayoutProps{
    children: React.ReactNode;  
}

const Layout:React.FC<LayoutProps> = ({
    children
}) => {
  return (
    <>
    <Header />
      {children}
   </>
  )
}




export default Layout
