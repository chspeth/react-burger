import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../utils/types';
import { IProtectedNPublicRouteElementProps } from '../../utils/types';

const PublicRouteElement: FC<IProtectedNPublicRouteElementProps> = ({ element }) => {
  const { isAuthenticated, authChecked } = useAppSelector(state => state.auth);
  const location = useLocation();
  
  if (!authChecked) {
    return <p>Loading...</p>;
  }

  if (isAuthenticated) {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';
    console.log('PublicRouteElement redirecting to:', from);
    return <Navigate to={from} replace />;
  }

  return element;
}

export default PublicRouteElement;