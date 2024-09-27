import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRouteElement from '../protected-route/protected-route';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route 
          path='/profile' 
          element={<ProtectedRouteElement element={<ProfilePage />} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
