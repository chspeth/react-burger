import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../components/app-header/app-header';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/actions/user';
import styles from './pages.module.css';

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, navigate]);

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

  return (
    <>
      <AppHeader />
      <main>
        <div className={ styles['wrapper'] }>
          <div className={ styles['left'] }>
            <ul className={`${ styles['nav-list'] } text text_type_main-medium`}>
              <li className={ styles['nav-item'] }>
                Профиль
              </li>
              <li className={`${ styles['nav-item'] } text_color_inactive`}>
                История заказов
              </li>
              <li className={`${ styles['nav-item'] } text_color_inactive`}>
                Выход
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
          </form>
        </div>
      </main>
    </>
  )
}

export default ProfilePage;