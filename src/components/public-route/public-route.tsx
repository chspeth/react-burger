import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../utils/types';
import { IProtectedNPublicRouteElementProps } from '../../utils/types';

const PublicRouteElement: FC<IProtectedNPublicRouteElementProps> = ({ element }) => {
  const { isAuthenticated, authChecked } = useAppSelector(state => state.auth);
  
  if (!authChecked) {
    return null;
  }

  return !isAuthenticated ? element : <Navigate to='/' replace />;
}

export default PublicRouteElement;