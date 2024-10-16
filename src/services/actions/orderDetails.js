import { BASE_URL, request } from '../../utils/util';
import { clearConstructor } from './constructorDnd';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const orderSuccess = (orderNumber) => ({
  type: GET_ORDER_SUCCESS,
  payload: orderNumber,
});

export const orderFailed = (error) => ({
  type: GET_ORDER_FAILED,
  payload: error,
});

const API_URL = BASE_URL + '/orders';

export function orderDetails(ingredients) {
  return async (dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST
    });

    try {
      const data = await request(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients }) 
      });

      if (data && data.success) {
        dispatch({ 
          type: GET_ORDER_SUCCESS,
          payload: data.order.number
        });

        dispatch(clearConstructor());
      } else {
        throw new Error('Failed to create order');
      }  
    } catch (err) {
      dispatch(orderFailed(err.message));
      console.error('Error:', err);
    }
  }
}