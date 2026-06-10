import { useState } from 'react'
import Menu from '../Menu/Menu';
import { useNavigate } from 'react-router-dom';
import { DefinedRoutes } from '../../Helpers/RouteConstants';
import MaterialIcon from '../MaterialIcon/MaterialIcon';

const Header = () => {
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
      <div className="flex w-full items-center justify-between border-b border-white/10 bg-black/20 px-2 backdrop-blur-sm sm:px-4">
        <h2
          onClick={() => navigate(DefinedRoutes.Home)}
          className="m-0 cursor-pointer px-3 py-3 text-lg font-semibold tracking-wide text-white transition-colors duration-300 hover:text-[#ffcf0d] sm:px-4 sm:text-xl"
        >
          Caden McArthur
        </h2>
        <button
          type="button"
          onClick={handleMenu}
          aria-label={menu ? 'Close menu' : 'Open menu'}
          aria-expanded={menu}
          className={`my-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border transition-all duration-300
            ${menu
              ? 'border-[#ffcf0d]/50 bg-[#ffcf0d]/15 text-[#ffcf0d]'
              : 'border-white/10 bg-white/5 text-white/80 hover:border-[#ffcf0d]/40 hover:bg-[#ffcf0d]/10 hover:text-[#ffcf0d]'}`}
        >
          <MaterialIcon name={menu ? 'close' : 'menu'} className="text-2xl leading-none" />
        </button>
      </div>

      {menu && <Menu isMobileDevice={isMobileDevice} handleClose={handleMenu} />}
    </>
  )
}

export default Header
