import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRouteElement({ element }) {
  const { isAuthenticated, authChecked } = useSelector((state) => state.auth);
  const location = useLocation();
  
  if (!authChecked) {
    return null;
  }

  return isAuthenticated ? element : <Navigate to='/login' state={{ from: location }} replace />;
}

export default ProtectedRouteElement;