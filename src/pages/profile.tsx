import { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/types';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { getUser } from '../services/actions/user';
import { logoutUser } from '../services/actions/logout';
import styles from './pages.module.css';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, authChecked } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated && authChecked) {
      navigate('/login', { replace: true });
    } else {
      dispatch(getUser());
    }
  }, [authChecked, dispatch, isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const infoText = location.pathname === '/profile'
    ? ['В этом разделе вы можете', 'изменить свои персональные данные']
    : ['В этом разделе вы можете', 'просмотреть свою историю заказов'];

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
              {infoText[0]}<br/>{infoText[1]}
            </p>
          </div>
          <div className={ styles['right'] }>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  )
}

export default ProfilePage;
