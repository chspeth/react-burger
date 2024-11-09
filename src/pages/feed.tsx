import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Добавили useLocation
import CustomScrollbar from '../components/scrollbar/scrollbar';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';

import bun1 from '../images/buns/bun-01.png';
import bun2 from '../images/buns/bun-02.png';
import sauce1 from '../images/sauces/sauce-01.png';
import sauce2 from '../images/sauces/sauce-02.png';
import sauce3 from '../images/sauces/sauce-03.png';
import sauce4 from '../images/sauces/sauce-04.png';

const FeedPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Добавлено получение location

  const handleOrderClick = (orderId: string) => {
    navigate(`/feed/${orderId}`, { state: { backgroundLocation: location } });
  };

  const testData = [
    {
      id: '034535', // Убрали '#' из id для корректной передачи в URL
      time: 'Сегодня, 16:20',
      name: 'Death Star Starship Main бургер',
      price: 480,
      ingredients: [bun1, bun2, sauce1, sauce2, sauce3, sauce4],
    },
    {
      id: '034536',
      time: 'Сегодня, 16:45',
      name: 'Galactic Empire Burger',
      price: 520,
      ingredients: [bun1, bun2, sauce1, sauce2, sauce3],
    },
    {
      id: '034537',
      time: 'Сегодня, 17:00',
      name: 'Jedi Council Burger',
      price: 500,
      ingredients: [bun1, bun2, sauce1, sauce2],
    },
  ];

  const itemHeight = 214;
  const maxContainerHeight = 812;
  const calculatedHeight = Math.min((testData.length * itemHeight), maxContainerHeight);

  return (
    <>
      <main>
        <div className={`${ styles['wrapper'] } ${ styles['feed'] }`}>
          <h1 className='text text_type_main-medium'>Лента заказов</h1>
          <div className={ styles['feed-inner-wrapper'] }>
            <div className={ styles['feed-left'] }>
              <CustomScrollbar
                customStyles={{
                  wrapperHeight: `${calculatedHeight}px`,
                  top: '0',
                  bottom: '0'
                }}
              >
                <div className={ styles['feed-list'] }>
                  {testData.map((order, index) => {
                    const visibleItems = order.ingredients.slice(0, 5); 
                    const hiddenItemsCount = order.ingredients.length - visibleItems.length;

                    return (
                      <div 
                        key={index} 
                        className={ styles['feed-item'] }
                        onClick={() => handleOrderClick(order.id)} 
                      >
                        <p className={ styles['about-item'] }>
                          <span className='text text_type_digits-default'>#{order.id}</span> 
                          <span className='text text_type_main-default text_color_inactive'>{order.time}</span>
                        </p>
                        <span className='text text_type_main-medium'>{order.name}</span>
                        <div className={ styles['about-item'] }>
                          <div className={ styles['about-item-ingredients'] }>
                            <ul className={ styles['about-item-list'] }>
                              {visibleItems.map((src, index) => (
                                <li 
                                  key={index} 
                                  className={styles['about-item-item']}
                                  style={{ zIndex: visibleItems.length - index }}
                                >
                                  <img src={src} alt={`Ingredient ${index + 1}`} />
                                </li>
                              ))}
                              {hiddenItemsCount > 0 && (
                                <li className={`${styles['about-item-item']} ${styles['about-item-hidden']}`}>
                                  <img 
                                    src={order.ingredients[visibleItems.length]}
                                    alt='Additional items'
                                    className={styles['hidden-image']}
                                  />
                                  <span className={styles['hidden-counter']}>+{hiddenItemsCount}</span>
                                </li>
                              )}
                            </ul>
                          </div>
                          <p className={ styles['item-price'] }>
                            <span className='text text_type_digits-default'>{order.price}</span>
                            <CurrencyIcon type='primary' />
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CustomScrollbar>
            </div>
            <div className={ styles['feed-right'] }>
              <div className={ styles['right-inner-container'] }>
                <div className={ styles['right-inner-column'] }>
                  <p className='text text_type_main-medium'>Готовы:</p>
                  <ul className={ styles['right-list-orders'] } style={{ color: '#00cccc' }}>
                    <li className='text text_type_digits-default'>034533</li>
                    <li className='text text_type_digits-default'>034532</li>
                    <li className='text text_type_digits-default'>034530</li>
                    <li className='text text_type_digits-default'>034527</li>
                    <li className='text text_type_digits-default'>034525</li>
                  </ul>
                </div>
                <div className={ styles['right-inner-column'] }>
                  <p className='text text_type_main-medium'>В работе:</p>
                  <ul className={ styles['right-list-orders'] }>
                    <li className='text text_type_digits-default'>034538</li>
                    <li className='text text_type_digits-default'>034541</li>
                    <li className='text text_type_digits-default'>034542</li>
                  </ul>
                </div>
              </div>
              <p className='text text_type_main-medium'>Выполнено за все время:</p>
              <p className={`${styles['ready-number']} text text_type_digits-large mb-15`}>28752</p>
              <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
              <p className={`${styles['ready-number']} text text_type_digits-large`}>138</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
};

export default FeedPage;
