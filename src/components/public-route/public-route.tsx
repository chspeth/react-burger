import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IProtectedNPublicRouteElementProps, IAuthState } from '../../utils/types';

const PublicRouteElement: FC<IProtectedNPublicRouteElementProps> = ({ element }) => {
  const { isAuthenticated, authChecked } = useSelector((state: { auth: IAuthState }) => state.auth);
  
  if (!authChecked) {
    return null;
  }

  return !isAuthenticated ? element : <Navigate to='/' replace />;
}

export default PublicRouteElement;