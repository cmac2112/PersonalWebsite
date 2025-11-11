import React, { useState } from 'react'
import Menu from '../Menu/Menu';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = (
{
}
) => {
  const isMobileDevice = (): boolean => {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  const navigate = useNavigate();
  const [menu, setMenu] = useState<boolean>(false);


  const handleMenu = () => {
    setMenu(prev => !prev);
  }
  return (
      <>
    <div className='header-container'>
      <span className='title-span' onClick={() => navigate("/about-me")}>
        <h2 className='title-header'>Caden McArthur</h2>
        </span>
        <span className="material-symbols-outlined hamburger" onClick={handleMenu}>
menu
</span>
    </div>
    {menu ?
          <Menu isMobileDevice={isMobileDevice} handleClose={handleMenu}/>
          : <></>
    }
 </>
  )
}

export default Header
