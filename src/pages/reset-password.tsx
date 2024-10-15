import { useState, useEffect, FC } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { passwordResetConfirm, PASSWORD_RESET_CONFIRM_STATUS } from '../services/actions/password';
import { Link, useNavigate } from 'react-router-dom';
import styles from './pages.module.css';
import { IAuthState } from '../utils/types';

const ResetPasswordPage: FC = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { isLoading, passwordResetSuccess } = useSelector((state: { auth: IAuthState }) => state.auth);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    if (passwordResetSuccess) {
      navigate('/login'); 
      dispatch({ 
        type: PASSWORD_RESET_CONFIRM_STATUS 
      });
    }
  }, [passwordResetSuccess, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(passwordResetConfirm(password, token));
  };

  return (
    <>
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
              required
            />
            <Input
              type='text'
              placeholder='Введите код из письма'
              extraClass='mt-6'
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required 
              onPointerEnterCapture={undefined} // typescript требует добавления данных свойств, хотя обязательными они не являются, и консоль выдаёт ошибку
              onPointerLeaveCapture={undefined}
            />
            <Button 
              htmlType='submit' 
              type='primary' 
              size='medium'
              extraClass='mt-6'
              disabled={isLoading}
            >
              Сохранить
            </Button>
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