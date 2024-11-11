import { BASE_URL, request } from '../../utils/util';
import { AppDispatch } from '../store';
import { clearConstructor } from './constructorDnd';
import { ICreateOrderResponse, IOrderResponse } from '../../utils/types';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export const GET_ORDER_BY_ID_REQUEST: 'GET_ORDER_BY_ID_REQUEST' = 'GET_ORDER_BY_ID_REQUEST';
export const GET_ORDER_BY_ID_SUCCESS: 'GET_ORDER_BY_ID_SUCCESS' = 'GET_ORDER_BY_ID_SUCCESS';
export const GET_ORDER_BY_ID_FAILED: 'GET_ORDER_BY_ID_FAILED' = 'GET_ORDER_BY_ID_FAILED';

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: number;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
  readonly payload: string;
}

export interface IGetOrderByIdRequestAction {
  readonly type: typeof GET_ORDER_BY_ID_REQUEST;
}

export interface IGetOrderByIdSuccessAction {
  readonly type: typeof GET_ORDER_BY_ID_SUCCESS;
  readonly payload: any; 
}

export interface IGetOrderByIdFailedAction {
  readonly type: typeof GET_ORDER_BY_ID_FAILED;
  readonly payload: string;
}

export type TOrderActions =
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IGetOrderByIdRequestAction
  | IGetOrderByIdSuccessAction
  | IGetOrderByIdFailedAction;

export const getOrderSuccess = (orderNumber: number): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  payload: orderNumber,
});

export const getOrderFailed = (error: string): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED,
  payload: error,
});

const API_URL = BASE_URL + '/orders';

export function getOrder(ingredients: string[]) {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST
    });

    try {
      const data: ICreateOrderResponse = await request<ICreateOrderResponse>(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients }) 
      });

      if (data && data.success) {
        dispatch(getOrderSuccess(data.order.number));
        dispatch(clearConstructor());
      } else {
        throw new Error('Failed to create order');
      }  
    } catch (err: any) {
      dispatch(getOrderFailed(err.message));
      console.error('Error:', err);
    }
  }
};

export const getOrderById = (orderId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ 
      type: GET_ORDER_BY_ID_REQUEST 
    });

    try {
      const data: IOrderResponse = await request<IOrderResponse>(`${BASE_URL}/orders/${orderId}`, {
        method: 'GET',
      });

      if (data && data.success) {
        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data.orders[0] });
      } else {
        throw new Error('Failed to fetch order');
      }
    } catch (err: any) {
      dispatch({ type: GET_ORDER_BY_ID_FAILED, payload: err.message });
      console.error('Error:', err);
    }
  };
};