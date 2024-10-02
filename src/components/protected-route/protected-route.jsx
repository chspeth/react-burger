import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setRedirectPath } from '../../services/actions/redirect';

function ProtectedRouteElement({ element }) {
  const { isAuthenticated, authChecked } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && authChecked) {
      dispatch(setRedirectPath(location.pathname));
    }
  }, [dispatch, isAuthenticated, authChecked, location.pathname]);
  
  if (!authChecked) {
    return null;
  }

  return isAuthenticated ? element : <Navigate to='/login' replace />;
}

export default ProtectedRouteElement;