import AppHeader from '../components/app-header/app-header';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './pages.module.css';

function LoginPage() {
  return (
    <>
      <AppHeader />
      <main>
        <form action='#' className={ styles['form'] }>
          <fieldset>
            <legend className='text text_type_main-medium'>Вход</legend>
            <Input
              type='email'
              placeholder='E-mail'
              extraClass='mt-6'
            />
            <PasswordInput
              placeholder='Пароль'
              icon='ShowIcon'
              extraClass='mt-6'
            />
            <Button 
              htmlType='submit' 
              type='primary' 
              size='medium'
              extraClass='mt-6'>
                Войти
            </Button>
            <p className='mt-20 text text_type_main-default text_color_inactive'>
              Вы — новый пользователь? {' '}
              <Link to='/register' className={ styles['link'] }>Зарегистрироваться</Link>
            </p>
            <p className='mt-4 text text_type_main-default text_color_inactive'>
              Забыли пароль? {' '}
              <Link to='/forgot-password' className={ styles['link'] }>Восстановить пароль</Link>
            </p>
          </fieldset>
        </form>
      </main>
    </>
  )
}

export default LoginPage;