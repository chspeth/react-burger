import { FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { IIngredientBase, IOrder, useAppSelector } from '../../utils/types';
import CustomScrollbar from '../scrollbar/scrollbar';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order.module.css';

interface IOrderFeedProps {
  orders: IOrder[];
  isProfileOrders?: boolean;
}

const OrderFeed: FC<IOrderFeedProps> = ({ orders, isProfileOrders = false }) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { productData } = useAppSelector(state => state.products);
  const sortedOrders = orders.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  useEffect(() => {
  }, [sortedOrders]);
  const handleOrderClick = (orderNumber: number) => {
    navigate(`${location.pathname}/${orderNumber}`, { state: { backgroundLocation: location } });
  };

  const itemHeight = 214;
  const maxContainerHeight = 812;
  const heightOnPage = isProfileOrders ? '100vh' : '100%';
  const calculatedHeight = orders.length > 5 
    ? heightOnPage : `${Math.min((orders.length * itemHeight), maxContainerHeight)}px`;

  return (
    <CustomScrollbar
      customStyles={{
        wrapperHeight: calculatedHeight,
        top: '0',
        bottom: '0'
      }}
    >
      <div className={ styles['feed-list'] }>
        {sortedOrders.map((order) => {
          const orderIngredients = order.ingredients
            .map((ingredientId) => productData.find((ingredient) => ingredient._id === ingredientId))
            .filter(Boolean) as IIngredientBase[];

          const totalPrice = orderIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);

          const visibleItems = order.ingredients.slice(0, 5);
          const hiddenItemsCount = order.ingredients.length - visibleItems.length;
          const hiddenItemImg = productData.find(item => item._id === order.ingredients[5])?.image;

          const statusColor = order.status === 'done' ? '#00CCCC' : '#F2F2F3';
          const statusText = order.status === 'done' ? 'Выполнен' :
            order.status === 'pending' ? 'Готовится' :
            order.status === 'created' ? 'Создан' : '';

          return (
            <div 
              key={order._id} 
              className={ styles['feed-item'] }
              onClick={() => handleOrderClick(order.number)} 
            >
              <p className={ styles['about-item'] }>
                <span className='text text_type_digits-default'>#{order.number}</span> 
                <span className='text text_type_main-default text_color_inactive'>
                  <FormattedDate date={new Date(order.createdAt)} />
                </span>
              </p>
              <div className={ styles['order-name-status'] }>
                <span className='text text_type_main-medium'>{order.name}</span>
                {isProfileOrders && (
                  <p 
                    className={`${styles['order-status']} text text_type_main-default`}
                    style={{ color: statusColor }}
                  >
                    {statusText}
                  </p>
                )}
              </div>
              <div className={ styles['about-item'] }>
                <div className={ styles['about-item-ingredients'] }>
                  <ul className={ styles['about-item-list'] }>
                    {visibleItems.map((itemId, index) => {
                      const ingredient = productData.find(item => item._id === itemId);
                      if (!ingredient) return null;

                      return (
                        <li 
                          key={index} 
                          className={styles['about-item-item']}
                          style={{ zIndex: visibleItems.length - index }}
                        >
                          <img src={ingredient.image} alt={ingredient.name} />
                        </li>
                      )
                    })}
                    {hiddenItemsCount > 0 && (
                      <li className={`${styles['about-item-item']} ${styles['about-item-hidden']}`}>
                        <img 
                          src={hiddenItemImg}
                          alt='Другие ингредиенты'
                          className={styles['hidden-image']}
                        />
                        <span className={styles['hidden-counter']}>+{hiddenItemsCount}</span>
                      </li>
                    )}
                  </ul>
                </div>
                <p className={ styles['total-price'] }>
                  <span className='text text_type_digits-default'>{totalPrice}</span>
                  <CurrencyIcon type='primary' />
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </CustomScrollbar>
  )
}

export default OrderFeed;