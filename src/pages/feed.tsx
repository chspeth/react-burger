import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/types';
import { wsConnectionStart, wsConnectionClose } from '../services/actions/wsActions';
import { wsUrl } from '../services/store';
import styles from './pages.module.css';
import OrderFeed from '../components/order/order-feed';

const FeedPage: FC = () => {
  const dispatch = useAppDispatch();

  const { orders, total, totalToday } = useAppSelector(state => state.ws);

  useEffect(() => {
    dispatch(wsConnectionStart(`${wsUrl}/all`));

    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch]);

  const doneOrders = orders.filter(order => order.status === 'done');
  const inProgressOrders = orders.filter(order => order.status !== 'done');

  const chunkArray = (array: any[], chunkSize: number) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };
  
  const doneOrderChunks = chunkArray(doneOrders, 10);
  const inProgressOrderChunks = chunkArray(inProgressOrders, 10); 
  const noOrdersText = 'Пока ничего нет';

  return (
    <>
      <main>
        <div className={`${ styles['wrapper'] } ${ styles['feed'] }`}>
          <h1 className='text text_type_main-medium'>Лента заказов</h1>
          <div className={ styles['feed-inner-wrapper'] }>
            <div className={ styles['feed-left'] }>
              <OrderFeed />
            </div>
            <div className={ styles['feed-right'] }>
              <div className={ styles['right-inner-container'] }>
                <div className={ styles['right-inner-column'] }>
                  <p className={`${styles['right-inner-title']} text text_type_main-medium`}>Готовы:</p>
                  <div className={ styles['columns-container'] }>
                    {doneOrderChunks.length === 0 
                      ? <span className='text text_type_main-default'>{noOrdersText}</span> 
                      : doneOrderChunks.map((chunk, chunkIndex) => (
                      <ul key={chunkIndex} className={ styles['right-list-orders'] } style={{ color: '#00cccc' }}>
                        {chunk.map(order => {
                          return (
                            <li key={order._id} className='text text_type_digits-default'>
                              {order.number}
                            </li>
                          )
                        })}
                      </ul>
                    ))}
                  </div>
                </div>
                <div className={ styles['right-inner-column'] }>
                  <p className={`${styles['right-inner-title']} text text_type_main-medium`}>В работе:</p>
                  <div className={ styles['columns-container'] }>
                    {inProgressOrderChunks.length === 0 
                      ? <span className='text text_type_main-default'>{noOrdersText}</span> 
                      : inProgressOrderChunks.map((chunk, chunkIndex) => (
                      <ul key={chunkIndex} className={ styles['right-list-orders'] }>
                        {chunk.map(order => (
                          <li key={order._id} className='text text_type_digits-default'>
                            {order.number}
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
              <p className='text text_type_main-medium mt-10'>Выполнено за все время:</p>
              <p className={`${styles['ready-number']} text text_type_digits-large mb-15`}>{total}</p>
              <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
              <p className={`${styles['ready-number']} text text_type_digits-large`}>{totalToday}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
};

export default FeedPage;
