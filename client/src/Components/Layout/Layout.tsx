import React from 'react'
import Header from '../Header/Header';

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
   </>
  )
}




export default Layout
