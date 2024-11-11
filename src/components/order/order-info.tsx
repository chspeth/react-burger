import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/types';
import CustomScrollbar from '../scrollbar/scrollbar';
import styles from './order.module.css';
import { getOrderById } from '../../services/actions/orderDetails';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { productData } = useAppSelector(state => state.products);
  const { selectedOrder, isLoading } = useAppSelector(state => state.details);

  useEffect(() => {
    if (id) {
      if (!selectedOrder || selectedOrder.number !== Number(id)) {
        dispatch(getOrderById(id!));
      }
    }
  }, [dispatch, id, selectedOrder]);

  if (isLoading || !selectedOrder) {
    return <p className='text text_type_main-medium'>Загрузка...</p>;
  }

  const ingredientCounts = selectedOrder.ingredients.reduce(
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
      return sum + item.ingredient.price * item.count;
    }
    return sum;
  }, 0);

  return (
    <>
      <div className={ styles['order-contsiner'] }>
        <p className={`${ styles['number'] } text text_type_digits-default mb-10`}>#{selectedOrder.number}</p>
        <p className='text text_type_main-medium mb-3'>{selectedOrder.name}</p>
        <p className='text text_type_main-small mb-15'>{selectedOrder.status}</p>
        <p className='text text_type_main-medium mb-6'>Состав:</p>
        <CustomScrollbar
          customStyles={{
            wrapperHeight: '312px',
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
          <span>{selectedOrder.createdAt}</span>
          <span>{totalPrice}</span>
        </p>
      </div>
    </>
  );
};

export default OrderInfo;