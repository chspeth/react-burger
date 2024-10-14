import { useSelector } from 'react-redux';
import orderCompletedIcon from '../../../images/icons/order-completed.svg';
import styles from './order-details.module.css';

const OrderDetails = () => {
  const { orderNumber, isLoading } = useSelector((state) => state.details);
  return (
    <div className={styles['wrapper']}>
      {isLoading && <p className="text text_type_main-medium">Загрузка...</p>}
      {!isLoading && (
        <>
          <p className={`${styles['order-id']} text text_type_digits-large`}>{orderNumber}</p>
          <p className='text text_type_main-medium'>идентификатор заказа</p>
        </>
        )}
      <img className={styles['order-completed-img']} src={orderCompletedIcon} alt='Order completed icon' />
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;