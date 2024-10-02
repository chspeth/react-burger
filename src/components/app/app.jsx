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
import OrdersPage from '../../pages/orders';
import NotFound404 from '../../pages/not-found';

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
        >
          <Route 
            path='orders' 
            element={<ProtectedRouteElement element={<OrdersPage />} />}
          />
        </Route>

        <Route path="*" element={<NotFound404/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
