import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
//holy prop drill
interface LayoutProps{
    children: React.ReactNode;  
    handleRestartAnimation: () => void;
}

const Layout:React.FC<LayoutProps> = ({
  handleRestartAnimation,
    children
}) => {
  return (
    <>
    <Header handleRestartAnimation={handleRestartAnimation} />
      {children}
    <Footer />
   </>
  )
}




export default Layout
