import React, { useState } from 'react'
import Menu from '../Menu/Menu';
import './Header.css'
const Header = (

) => {
  const handleRestartAnimation = () =>{
    return;
  }
  const isMobileDevice = ():boolean => {
    return false;
  }
  const [menu, setMenu] = useState<boolean>(false);


  const handleMenu = () => {
    console.log(menu)
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
