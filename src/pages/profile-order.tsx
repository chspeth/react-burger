import { FC, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/types';
import { WS_USER_CONNECTION_START, WS_USER_CONNECTION_CLOSED } from '../services/actions/wsUserActions';
import OrderFeed from '../components/order/order-feed';

const ProfileOrdersPage: FC = () => {
  const dispatch = useAppDispatch();
  const mountedRef = useRef(false);
  const url = 'orders';

  const privateFeedData = useAppSelector(state => state.wsUser);

  const orders = useMemo(() => {
    return (privateFeedData.messages.orders || []).slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [privateFeedData.messages]);

  useEffect(() => {
    let ignore = false;

    if (!mountedRef.current) {
      mountedRef.current = true;
      dispatch({
        type: WS_USER_CONNECTION_START,
        payload: { url, token: true }
      });
    }

    return () => {
      if (ignore) {
        return;
      } else {
        ignore = true;
        dispatch({ type: WS_USER_CONNECTION_CLOSED });
        mountedRef.current = false;
      }
    };
  }, [dispatch, url]);

  return (
    <OrderFeed orders={orders} isProfileOrders={true} />
  );
};

export default ProfileOrdersPage;
