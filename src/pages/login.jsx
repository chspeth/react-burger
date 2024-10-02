import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../components/app-header/app-header';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/actions/login';
import { clearRedirectPath, clearPendingOrder } from '../services/actions/redirect';
import { orderDetails } from '../services/actions/orderDetails';
import styles from './pages.module.css';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, redirectPath, pendingOrder } = useSelector((state) => state.auth);
  const { bun, fillings } = useSelector((state) => state.constructorItems);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {

    if (isAuthenticated) {
      if (pendingOrder) {
        const ingredients = [bun?._id, ...fillings.map(item => item._id)];
        
        dispatch(orderDetails(ingredients));
        dispatch(clearPendingOrder());
        dispatch(clearRedirectPath());
        
        navigate('/', { replace: true });
      } else {
        const targetPath = redirectPath && redirectPath !== '/login' ? redirectPath : '/profile';
        
        navigate(targetPath, { replace: true });
        dispatch(clearRedirectPath());
      }
    }
  }, [bun?._id, dispatch, fillings, isAuthenticated, navigate, pendingOrder, redirectPath]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  }

  return (
    <>
      <AppHeader />
      <main>
        <form 
          action='#' 
          className={ styles['form'] }
          onSubmit={handleSubmit}
        >
          <fieldset>
            <legend className='text text_type_main-medium'>Вход</legend>
            <EmailInput
              placeholder='E-mail'
              extraClass='mt-6'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              placeholder='Пароль'
              icon='ShowIcon'
              extraClass='mt-6'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
              htmlType='submit' 
              type='primary' 
              size='medium'
              extraClass='mt-6'
              disabled={isLoading}
            >
              Войти
            </Button>
            <p className='mt-20 text text_type_main-default text_color_inactive'>
              Вы — новый пользователь? {' '}
              <Link to='/register' className={ styles['link'] }>Зарегистрироваться</Link>
            </p>
            <p className='mt-4 text text_type_main-default text_color_inactive'>
              Забыли пароль? {' '}
              <Link to='/forgot-password' className={ styles['link'] }>Восстановить пароль</Link>
            </p>
          </fieldset>
        </form>
      </main>
    </>
  )
}

export default LoginPage;