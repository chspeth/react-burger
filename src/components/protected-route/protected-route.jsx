import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../services/actions/user';

function ProtectedRouteElement({ element }) {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, isLoading]);

  if (isLoading) {
    return null; 
  }

  return isAuthenticated ? element : <Navigate to='/login' replace />;
}

export default ProtectedRouteElement;