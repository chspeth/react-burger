import AppHeader from '../components/app-header/app-header';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { passwordResetRequest } from '../services/actions/password';
import styles from './pages.module.css';

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector((state) => state.password);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordResetRequest(email));
  };

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
            <legend className='text text_type_main-medium'>Восстановление пароля</legend>
            <Input
              type='email'
              placeholder='Укажите e-mail'
              extraClass='mt-6'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              htmlType='submit' 
              type='primary' 
              size='medium'
              extraClass='mt-6'
              disabled={isLoading}
            >
              {isLoading ? 'Загрузка...' : 'Восстановить'}
            </Button>
            {error && <p className='text text_type_main-default'>{error}</p>}
            {success && <p className='text text_type_main-default'>Инструкция отправлена на почту</p>}
            <p className='mt-20 text text_type_main-default text_color_inactive'>
              Вспомниль пароль? {' '}
              <Link to='/login' className={ styles['link'] }>Войти</Link>
            </p>
          </fieldset>
        </form>
      </main>
    </>
  )
}

export default ForgotPasswordPage;