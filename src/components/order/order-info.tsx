import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/types';
import CustomScrollbar from '../scrollbar/scrollbar';
import styles from './order.module.css';
import { getOrderById } from '../../services/actions/orderDetails';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { productData } = useAppSelector(state => state.products);
  const { selectedOrder, isLoading } = useAppSelector(state => state.details);
  const publicFeedData = useAppSelector(state => state.wsPublic);

  const orders = useMemo(() => {
    return publicFeedData?.messages?.orders || []
  }, [publicFeedData.messages]);

  useEffect(() => {
    if (id) {
      if (!selectedOrder || selectedOrder.number !== Number(id)) {
        dispatch(getOrderById(id!));
      }
    }
  }, [dispatch, id, selectedOrder]);

  const order = useMemo(() => {
    return orders.find(order => order._id === id || String(order.number) === id);
  }, [orders, id]);

  useEffect(() => {
    if (!order && id) {
      dispatch(getOrderById(id));
    }
  }, [dispatch, id, order]);

  const currentOrder = order || selectedOrder;

  if (isLoading || !currentOrder) {
    return <p className='text text_type_main-medium'>Загрузка...</p>;
  }

  const statusColor = currentOrder.status === 'done' ? '#00CCCC' : '#F2F2F3';
  const statusText = currentOrder.status === 'done' ? 'Выполнен' :
    currentOrder.status === 'pending' ? 'Готовится' :
    currentOrder.status === 'created' ? 'Создан' : '';

  const ingredientCounts = currentOrder.ingredients.reduce(
    (acc: Record<string, number>, ingredientId: string) => {
    acc[ingredientId] = (acc[ingredientId] || 0) + 1;
    return acc;
  }, {});

  const ingredientsData = Object.keys(ingredientCounts).map(ingredientId => {
    const ingredient = productData.find(item => item._id === ingredientId);
    return {
      ingredient,
      count: ingredientCounts[ingredientId],
    };
  });

  const totalPrice = ingredientsData.reduce((sum, item) => {
    if (item.ingredient && item.ingredient.price) {
      item.count = item.ingredient.type === 'bun' ? 2 : item.count;
      return sum + (item.ingredient.price * item.count);
    }
    return sum;
  }, 0);

  const itemHeight = 76; 
  const uniqueIngredientsCount = ingredientsData.length;
  const scrollBarHeight = uniqueIngredientsCount < 4 ? `${uniqueIngredientsCount * itemHeight}px` : '312px';

  return (
    <>
      <div className={ styles['order-container'] }>
        <p className={`${ styles['number'] } text text_type_digits-default mb-8`}>#{currentOrder.number}</p>
        <p className='text text_type_main-medium mb-3'>{currentOrder.name}</p>
        <p 
          className='text text_type_main-small mb-6'
          style={{ color: statusColor }}
        >
          {statusText}
        </p>
        <p className='text text_type_main-medium mb-4'>Состав:</p>
        <CustomScrollbar
          customStyles={{
            wrapperHeight: scrollBarHeight,
            top: '0',
            bottom: '0'
          }}
        >
          <ul className={ styles['ingredients-list'] }>
            {ingredientsData.map((item, index) => (
              item.ingredient && (
                <li key={index} className={styles['ingredient-item']}>
                  <div className={styles['ingredient-image']}>
                    <img src={item.ingredient.image_mobile} alt={item.ingredient.name} />
                  </div>
                  <p className={`${styles['ingredient-name']} text text_type_main-default`}>
                    {item.ingredient.name}
                  </p>
                  <div className={styles['ingredient-price']}>
                    <span className='text text_type_digits-default'>
                      {item.count} x {item.ingredient.price}
                    </span>
                    <CurrencyIcon type='primary' />
                  </div>
                </li>
              )
            ))}
          </ul>
        </CustomScrollbar>
        <p className={ styles['order-total'] }>
          <span className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={new Date(currentOrder.createdAt)} />
          </span>
          <p className={ styles['total-price'] }>
            <span className='text text_type_digits-default'>{totalPrice}</span>
            <CurrencyIcon type='primary' />
          </p>
        </p>
      </div>
    </>
  );
};

export default OrderInfo;