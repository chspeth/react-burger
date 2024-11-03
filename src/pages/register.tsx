import { useState, useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/types';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/actions/register';
import styles from './pages.module.css';

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, name }));
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
            <legend className='text text_type_main-medium'>Регистрация</legend>
            <Input
              type='text'
              placeholder='Имя'
              extraClass='mt-6'
              value={name}
              onChange={(e) => setName(e.target.value)} 
              onPointerEnterCapture={undefined} // typescript требует добавления данных свойств, хотя обязательными они не являются, и консоль выдаёт ошибку
              onPointerLeaveCapture={undefined}
            />
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
                Зарегистрироваться
            </Button>
            <p className='mt-20 text text_type_main-default text_color_inactive'>
              Уже зарегистрированы? {' '}
              <Link to='/login' className={ styles['link'] }>Войти</Link>
            </p>
          </fieldset>
        </form>
      </main>
    </>
  )
}

export default RegisterPage;