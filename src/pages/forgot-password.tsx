import { useState, useEffect, FC } from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/types';
import { passwordResetRequest, PASSWORD_RESET_STATUS } from '../services/actions/password';
import styles from './pages.module.css';

const ForgotPasswordPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, passwordResetRequested } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return null;

    dispatch(passwordResetRequest(email));
    dispatch({
      type: PASSWORD_RESET_STATUS
    })
  };

  useEffect(() => {
    if (passwordResetRequested) {
      navigate('/reset-password');
    }
  }, [passwordResetRequested, navigate]);

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
            <EmailInput
              placeholder='Укажите e-mail'
              extraClass='mt-6'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              htmlType='submit' 
              type='primary' 
              size='medium'
              extraClass='mt-6'
              disabled={isLoading}
            >
              Восстановить
            </Button>
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