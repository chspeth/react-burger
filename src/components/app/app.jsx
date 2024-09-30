import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getUser } from '../../services/actions/user';
import ProtectedRouteElement from '../protected-route/protected-route';
import PublicRouteElement from '../public-route/public-route';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route 
          path='/login'
          element={<PublicRouteElement element={<LoginPage />} />}
        />
        <Route 
          path='/register'
          element={<PublicRouteElement element={<RegisterPage />} />}
        />
        <Route 
          path='/forgot-password'
          element={<PublicRouteElement element={<ForgotPasswordPage />} />}
        />
        <Route 
          path='/reset-password'
          element={<PublicRouteElement element={<ResetPasswordPage />} />} 
        />

        <Route 
          path='/profile' 
          element={<ProtectedRouteElement element={<ProfilePage />} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
