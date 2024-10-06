import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PublicRouteElement({ element }) {
  const { isAuthenticated, authChecked } = useSelector((state) => state.auth);
  
  if (!authChecked) {
    return null;
  }

  return !isAuthenticated ? element : <Navigate to='/' replace />;
}

export default PublicRouteElement;