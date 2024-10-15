import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface IPublicRouteElementProps {
  element: ReactElement;
}

interface IAuthState {
  user: {
    email: string;
    name: string;
  } | null;
  accessToken: string | null;
  refreshToken:  string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasError: boolean;
  passwordResetRequested: boolean;
  passwordResetSuccess: boolean;
  authChecked: boolean;
}

const PublicRouteElement: FC<IPublicRouteElementProps> = ({ element }) => {
  const { isAuthenticated, authChecked } = useSelector((state: { auth: IAuthState }) => state.auth);
  
  if (!authChecked) {
    return null;
  }

  return !isAuthenticated ? element : <Navigate to='/' replace />;
}

export default PublicRouteElement;