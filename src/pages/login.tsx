import { useState, useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/types';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../services/actions/login';
import styles from './pages.module.css';

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = location.state?.from?.pathname || '/';
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [from, isAuthenticated, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  }

  return (
    <>
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
              required
            />
            <PasswordInput
              placeholder='Пароль'
              icon='ShowIcon'
              extraClass='mt-6'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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