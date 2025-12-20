import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DefinedRoutes } from '../Helpers/RouteConstants';
const NotFoundRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const attemptedPath = location.pathname.replace("/", "");
    navigate(
        `${DefinedRoutes.Projects}/${encodeURIComponent(attemptedPath)}`,
        { replace: true}
    )

  }, [location, navigate])
  return null;
}

export default NotFoundRedirect
