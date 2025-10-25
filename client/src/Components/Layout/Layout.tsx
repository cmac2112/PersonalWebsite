import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
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
    <Footer />
   </>
  )
}




export default Layout
