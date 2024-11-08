import { BASE_URL, request } from '../../utils/util';
import { AppDispatch } from '../store';
import { clearConstructor } from './constructorDnd';
import { IOrderResponse } from '../../utils/types';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

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

export type TOrderActions =
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction;

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
      const data: IOrderResponse = await request<IOrderResponse>(API_URL, {
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
}