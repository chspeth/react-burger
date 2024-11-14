import React, { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/types';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { getUser } from '../../services/actions/user';
import { getItems } from '../../services/actions/productData';
import { closeModal } from '../../services/actions/modal';
import AppHeader from '../app-header/app-header';
import ProtectedRouteElement from '../protected-route/protected-route';
import PublicRouteElement from '../public-route/public-route';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import NotFound404 from '../../pages/not-found';
import IngredientDetailsPage from '../../pages/ingredient-details';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import FeedPage from '../../pages/public-feed';
import ProfileForm from '../profile/profile-form';
import OrderInfo from '../order/order-info';
import OrderInfoPage from '../../pages/order-details';
import ProfileOrdersPage from '../../pages/profile-order';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) { 
      dispatch(getUser());
    } else {
      dispatch({ type: 'SET_AUTH_CHECKED' });
    }
    dispatch(getItems());
  }, [dispatch]);

  const backgroundLocation = location.state?.backgroundLocation;
  const { isModalOpen, modalContent } = useAppSelector(state => state.modal);

  const handleIngredientModalClose = () => {
    navigate(-1);
  };

  const handleOrderModalClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <AppHeader />
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
          <Route index element={<ProfileForm />} /> 
          <Route path='orders' element={<ProfileOrdersPage />} />
          <Route path='orders/:id' element={<OrderInfoPage />} />
        </Route>

        <Route path='/feed' element={<FeedPage />} />
        <Route path='/feed/:id' element={<OrderInfoPage />} />

        <Route path='/ingredients/:id' element={<IngredientDetailsPage />} />

        <Route path='*' element={<NotFound404/>}/>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal 
                title='Детали ингредиента'
                onClose={handleIngredientModalClose}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:id'
            element={
              <Modal onClose={handleIngredientModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:id'
            element={
              <Modal onClose={handleIngredientModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}

      {isModalOpen && (
        <Modal onClose={handleOrderModalClose}>
          {modalContent}
        </Modal>
      )}
    </>
  );
}

export default App;
