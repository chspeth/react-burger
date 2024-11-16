import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILED,
  TOrderActions
} from '../actions/orderDetails';
import { IOrder } from '../../utils/types';

export interface IOrderState {
  orderNumber: number | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  selectedOrder: IOrder | null;
}

const initialState: IOrderState = {
  orderNumber: null,
  isLoading: false,
  hasError: false,
  errorMessage: null,
  selectedOrder: null,
}

export const orderReducer = (
  state: IOrderState = initialState, 
  action: TOrderActions): IOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
    case GET_ORDER_BY_ID_REQUEST:
      return { ...state, isLoading: true, hasError: false, errorMessage: null };
    case GET_ORDER_SUCCESS:
      return { ...state, orderNumber: action.payload, isLoading: false };
    case GET_ORDER_BY_ID_SUCCESS:
      return { ...state, selectedOrder: action.payload, isLoading: false };
    case GET_ORDER_FAILED:
    case GET_ORDER_BY_ID_FAILED:
      return { ...state, hasError: true, isLoading: false, errorMessage: action.payload };
    default:
      return state;
  }
};