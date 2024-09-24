import AppHeader from '../components/app-header/app-header';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './pages.module.css';

function RegisterPage() {
  return (
    <>
      <AppHeader />
      <main>
        <form action='#' className={ styles['form'] }>
          <fieldset>
            <legend className='text text_type_main-medium'>Регистрация</legend>
            <Input
              type='text'
              placeholder='Имя'
              extraClass='mt-6'
            />
            <EmailInput
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