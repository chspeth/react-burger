import AppHeader from '../components/app-header/app-header';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';

function ProfilePage() {
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
          <form>
            <Input
              placeholder='Имя'
              icon='EditIcon'
             />
            <EmailInput
              placeholder='Логин'
              extraClass='mt-6'
              icon='EditIcon'
             />
            <PasswordInput
              placeholder='Пароль'
              extraClass='mt-6'
              icon='EditIcon'
             />
          </form>
        </div>
      </main>
    </>
  )
}

export default ProfilePage;