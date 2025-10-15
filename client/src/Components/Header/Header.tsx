import React, { useState } from 'react'
import Menu from '../Menu/Menu';
import './Header.css';

interface HeaderProps{
  handleRestartAnimation: () => void;
}
const Header:React.FC<HeaderProps> = (
{
  handleRestartAnimation
}
) => {
  const isMobileDevice = (): boolean => {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  const [menu, setMenu] = useState<boolean>(false);


  const handleMenu = () => {
    setMenu(prev => !prev);
  }
  return (
      <>
    <div className='header-container'>
        <h2 className='title-header'>Caden McArthur</h2>
        <span className="material-symbols-outlined hamburger" onClick={handleMenu}>
menu
</span>
    </div>
    {menu ?
          <Menu handleRestartAnimation={handleRestartAnimation} isMobileDevice={isMobileDevice} />
          : <></>
    }
 </>
  )
}

export default Header
