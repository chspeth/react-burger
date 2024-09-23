import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={ styles['app-header'] }>
      <div className={`${ styles['wrapper'] } pt-4 pb-4`}>
        <nav className={ styles['navigation'] }>
          <ul className={`text text_type_main-default ${ styles['nav-list'] }`}>
            <li className={ styles['nav-item'] }>
              <a className={`${ styles['nav-link'] } pr-5 pl-5 pt-4 pb-4`} href="">
                <BurgerIcon type="primary" />
                <span className='pl-2'>Конструктор</span>
              </a>
            </li>
            <li className={ styles['nav-item'] }>
              <a className={`${ styles['nav-link'] } pr-5 pl-5 pt-4 pb-4`} href="">
                <ListIcon type="primary" />
                <span className='pl-2'>Лента заказов</span>
              </a>
            </li>
            <li className={ styles['nav-item'] }>
              <a className={`${ styles['nav-link'] } pr-5 pl-5 pt-4 pb-4`} href="">
                <ProfileIcon type="primary" />
                <span className='pl-2'>Личный кабинет</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className={ styles['logo-wrapper'] }>
          <Logo />
        </div>
      </div>
    </header>
  )
}

export default AppHeader;