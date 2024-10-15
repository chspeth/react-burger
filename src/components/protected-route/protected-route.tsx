import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface IProtectedRouteElementProps {
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

const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({ element }) => {
  const { isAuthenticated, authChecked } = useSelector((state: { auth: IAuthState }) => state.auth);
  const location = useLocation();
  
  if (!authChecked) {
    return null;
  }

  return isAuthenticated ? element : <Navigate to='/login' state={{ from: location }} replace />;
}

export default ProtectedRouteElement;