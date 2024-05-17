import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import './app-header.css';

const AppHeader = () => {
  return (
    <header className='app-header p-4'>
      <div className='wrapper'>
        <nav className='navigation'>
          <ul className='nav-list text text_type_main-default'>
            <li className='nav-item'>
              <a className='nav-link pr-5 pl-5 pt-4 pb-4' href="">
                <BurgerIcon type="primary" />
                <span className='pl-2'>Конструктор</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link pr-5 pl-5 pt-4 pb-4' href="">
                <ListIcon type="primary" />
                <span className='pl-2'>Лента заказов</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link pr-5 pl-5 pt-4 pb-4' href="">
                <ProfileIcon type="primary" />
                <span className='pl-2'>Личный кабинет</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className='logo-wrapper'>
          <Logo />
        </div>
      </div>
    </header>
  )
}

export default AppHeader;