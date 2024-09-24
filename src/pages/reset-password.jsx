import AppHeader from '../components/app-header/app-header';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { passwordResetConfirm } from '../services/actions/password';
import styles from './pages.module.css';

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector((state) => state.password);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordResetConfirm(password, token));
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
            <PasswordInput
              placeholder='Введите новый пароль'
              icon='ShowIcon'
              extraClass='mt-6'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type='text'
              placeholder='Введите код из письма'
              extraClass='mt-6'
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <Button 
              htmlType='submit' 
              type='primary' 
              size='medium'
              extraClass='mt-6'
              disabled={isLoading}
            >
              {isLoading ? 'Загрузка...' : 'Сохранить'}
            </Button>
            {error && <p className='text text_type_main-default'>{error}</p>}
            {success && <p className='text text_type_main-default'>Пароль успешно изменен</p>}
            <p className='mt-20 text text_type_main-default text_color_inactive'>
              Вспомнили пароль? {' '}
              <Link to='/login' className={ styles['link'] }>Войти</Link>
            </p>
          </fieldset>
        </form>
      </main>
    </>
  )
}

export default ResetPasswordPage;