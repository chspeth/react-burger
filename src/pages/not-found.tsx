import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './pages.module.css';

const NotFound404: FC = () => {
  return (
    <div className={ `${styles['center-container']} pt-30` }>
      <h1 className='text text_type_main-large'>Oops! <span className='text text_type_digits-large'>404</span> Error</h1>
      <br />
      <br />
      <p className='text text_type_main-medium'>Страницы не существует</p>
      <br />
      <br />
      <p className='text text_type_main-medium'>Пройдите на <Link to='/' className={ styles['inactive-link'] }>главную страницу</Link></p>
    </div>
  )
}

export default NotFound404;