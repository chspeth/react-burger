import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, matchPath } from 'react-router-dom';
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
import IngredientDetailsPage from '../../pages/ingredient-details-page';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import IngredientModal from '../modal/ingredient-modal/ingredient-modal';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const backgroundLocation = location.state?.backgroundLocation;
  const modalPath = '/ingredients/:id';
  const isModal = matchPath(modalPath, location.pathname);
  const isModalOpen = backgroundLocation && isModal;

  return (
    <>
      <Routes location={backgroundLocation || location}>
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

        <Route path='/ingredients/:id' element={<IngredientDetailsPage />} />

        <Route path='*' element={<NotFound404/>}/>
      </Routes>

      {isModalOpen && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <IngredientModal>
                <IngredientDetails />
              </IngredientModal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
