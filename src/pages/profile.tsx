import { useState, useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/types';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, NavLink, useLocation, Outlet } from 'react-router-dom';
import { getUser, updateUser } from '../services/actions/user';
import { logoutUser } from '../services/actions/logout';
import styles from './pages.module.css';

const ProfilePage: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, authChecked } = useAppSelector(state => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [originalData, setOriginalData] = useState({ name: '', email: '' });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && authChecked) {
      navigate('/login', { replace: true });
    } else {
      dispatch(getUser());
    }
  }, [authChecked, dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setOriginalData({ name: user.name, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (name !== originalData.name || email !== originalData.email || password !== '') {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    }
  }, [name, email, password, originalData, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      name,
      email,
      password: password || '',
    };
    dispatch(updateUser(updatedData));
  };

  const handleCancel = () => {
    setName(originalData.name);
    setEmail(originalData.email);
    setPassword('');
    setIsModified(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <main>
        <div className={ styles['wrapper'] }>
          <div className={ styles['left'] }>
            <ul className={`${ styles['nav-list'] } text text_type_main-medium`}>
              <li className={ styles['nav-item'] }>
                <NavLink
                  to='/profile'
                  end
                  className={({ isActive }) =>
                    isActive ? styles['active-link'] : styles['inactive-link']
                  }
                >
                  Профиль
                </NavLink>
              </li>
              <li className={ styles['nav-item'] }>
                <NavLink
                  to='/profile/orders'
                  className={({ isActive }) =>
                    isActive ? styles['active-link'] : styles['inactive-link']
                  }
                >
                  История заказов
                </NavLink>
              </li>
              <li className={ styles['nav-item'] }>
                <button
                  type='button'
                  onClick={handleLogout}
                  className={`${styles['logout-button']} text text_type_main-medium ${
                    styles['inactive-link']
                  }`}
                >
                  Выход
                </button>
              </li>
            </ul>
            <p className='text text_type_main-default text_color_inactive'>
              В этом разделе вы можете <br/> изменить свои персональные данные
            </p>
          </div>
          {location.pathname === '/profile' ? (
            <form onSubmit={handleSubmit}>
              <Input
                type='text'
                placeholder='Имя'
                icon='EditIcon'
                value={name}
                name='name'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
                onPointerEnterCapture={undefined} // typescript требует добавления данных свойств, хотя обязательными они не являются, и консоль выдаёт ошибку
                onPointerLeaveCapture={undefined}
              />
              <EmailInput
                placeholder='Логин'
                extraClass='mt-6'
                isIcon={true}
                value={email}
                name='email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                placeholder='Пароль'
                extraClass='mt-6'
                icon='EditIcon'
                value={password}
                name='password'
                onChange={(e) => setPassword(e.target.value)}
              />
              {isModified && (
                <div className={styles['button-group']}>
                  <Button
                    type='secondary'
                    size='medium'
                    onClick={handleCancel}
                    extraClass='mr-4' 
                    htmlType='button' 
                  >
                    Отмена
                  </Button>
                  <Button
                    type='primary'
                    size='medium'
                    htmlType={'submit'}
                  >
                    Сохранить
                  </Button>
                </div>
              )}
            </form>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </>
  )
}

export default ProfilePage;