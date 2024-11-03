import { FC } from 'react';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './app-header.module.css';

const AppHeader: FC = () => {
  return (
    <header className={ styles['app-header'] }>
      <div className={`${ styles['wrapper'] } pt-4 pb-4`}>
        <nav className={ styles['navigation'] }>
          <ul className={`text text_type_main-default ${ styles['nav-list'] }`}>
            <li className={ styles['nav-item'] }>
              <Link className={`${ styles['nav-link'] } pr-5 pl-5 pt-4 pb-4`} to='/'>
                <BurgerIcon type='primary' />
                <span className='pl-2'>Конструктор</span>
              </Link>
            </li>
            <li className={ styles['nav-item'] }>
              <Link className={`${ styles['nav-link'] } pr-5 pl-5 pt-4 pb-4`} to='/'>
                <ListIcon type='primary' />
                <span className='pl-2'>Лента заказов</span>
              </Link>
            </li>
            <li className={ styles['nav-item'] }>
              <Link className={`${ styles['nav-link'] } pr-5 pl-5 pt-4 pb-4`} to='/profile'>
                <ProfileIcon type='primary' />
                <span className='pl-2'>Личный кабинет</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={ styles['logo-wrapper'] }>
          <Link to='/'>
            <Logo />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;