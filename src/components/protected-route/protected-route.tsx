import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IProtectedNPublicRouteElementProps, IAuthState } from '../../utils/types';

const ProtectedRouteElement: FC<IProtectedNPublicRouteElementProps> = ({ element }) => {
  const { isAuthenticated, authChecked } = useSelector((state: { auth: IAuthState }) => state.auth);
  const location = useLocation();
  
  if (!authChecked) {
    return null;
  }

  return isAuthenticated ? element : <Navigate to='/login' state={{ from: location }} replace />;
}

export default ProtectedRouteElement;