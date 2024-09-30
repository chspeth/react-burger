import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRouteElement({ element }) {
  const { isAuthenticated, authChecked } = useSelector((state) => state.auth);
  
  if (!authChecked) {
    return null;
  }

  return isAuthenticated ? element : <Navigate to='/login' replace />;
}

export default ProtectedRouteElement;