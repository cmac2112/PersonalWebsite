import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DefinedRoutes } from '../Helpers/RouteConstants';


/*
 this component needs to determine where to route a user based on the link clicked as well
 For example there needs to be a master list of topics i can use and provide in the blog post grouped by page

 So for experience: all projects on the experience page should route to /Experience then automatically scoll to the section it is in
 1. Stellar View
 2. Chess
 3. Any work experience etc...
*/

const NotFoundRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

   useEffect(() => {
    const pathname = location.pathname.toLowerCase();
    
    // List of valid top-level routes
    const validRoutes = Object.values(DefinedRoutes).map(route => route.toLowerCase()).filter(route => !route.includes('.pdf'));
    
    // Check if the current pathname matches any valid route
    const isValidRoute = validRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
    
    if (!isValidRoute && pathname !== '/') {
      // Only redirect to Experience if it's not a valid route
      const attemptedPath = pathname.replace(/^\//, "");
      navigate(`${DefinedRoutes.Projects}/${encodeURIComponent(attemptedPath)}`, { replace: true });
    }
  }, [location, navigate])
  
  return null;
}

export default NotFoundRedirect
