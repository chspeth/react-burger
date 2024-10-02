import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../components/app-header/app-header';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, NavLink } from 'react-router-dom';
import { getUser, updateUser } from '../services/actions/user';
import { logoutUser } from '../services/actions/logout';
import styles from './pages.module.css';

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, authChecked } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name, email, password }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <AppHeader />
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
          <form onSubmit={handleSubmit}>
            <Input
              placeholder='Имя'
              icon='EditIcon'
              value={name}
              name='name'
              onChange={(e) => setName(e.target.value)}
             />
            <EmailInput
              placeholder='Логин'
              extraClass='mt-6'
              icon='EditIcon'
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
            <Button 
              htmlType='submit' 
              type='primary' 
              size='medium'
              extraClass='mt-6'
            >
              Сохранить
            </Button>
          </form>
        </div>
      </main>
    </>
  )
}

export default ProfilePage;