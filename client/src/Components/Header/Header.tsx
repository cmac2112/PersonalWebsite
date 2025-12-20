import { useState } from 'react'
import Menu from '../Menu/Menu';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { DefinedRoutes } from '../../Helpers/RouteConstants';

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
      <span className='title-span' onClick={() => navigate(DefinedRoutes.Home)}>
        <h2 className='title-header'>Caden McArthur</h2>
        </span>
        <div className='right-header'>
        {/* leaving this for a future ui enhancement */}
        <span className="material-symbols-outlined hamburger" onClick={handleMenu}>
menu
</span>
</div>
    </div>
   
    {menu ?
          <Menu isMobileDevice={isMobileDevice} handleClose={handleMenu}/>
          : <></>
    }
 </>
  )
}

export default Header
