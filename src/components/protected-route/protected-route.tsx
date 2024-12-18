import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../utils/types';
import { IProtectedNPublicRouteElementProps } from '../../utils/types';

const ProtectedRouteElement: FC<IProtectedNPublicRouteElementProps> = ({ element }) => {
  const { isAuthenticated, authChecked } = useAppSelector(state => state.auth);
  const location = useLocation();
  
  if (!authChecked) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? element : <Navigate to='/login' state={{ from: location }} />;
}

export default ProtectedRouteElement;