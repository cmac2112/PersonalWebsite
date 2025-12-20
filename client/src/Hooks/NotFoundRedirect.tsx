import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const NotFoundRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const attemptedPath = location.pathname.replace("/", "");

    navigate(
        `/projects-and-experience/${encodeURIComponent(attemptedPath)}`,
        { replace: true}
    )

  }, [location, navigate])
  return null;
}

export default NotFoundRedirect
