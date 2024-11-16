import { FC } from 'react';
import OrderInfo from '../components/order/order-info';
import styles from './pages.module.css';

const OrderInfoPage: FC = () => {

  return (
    <>
      <div className={ styles['order-page-container'] }>
        <OrderInfo />
      </div>
    </>
  );
};

export default OrderInfoPage;