import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  TOrderActions
} from '../actions/orderDetails';

export interface IOrderState {
  orderNumber: number | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
}

const initialState: IOrderState = {
  orderNumber: null,
  isLoading: false,
  hasError: false,
  errorMessage: null
}

export const orderReducer = (
  state: IOrderState = initialState, 
  action: TOrderActions): IOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { ...state, isLoading: true, hasError: false, errorMessage: null };
    case GET_ORDER_SUCCESS:
      return { ...state, orderNumber: action.payload, isLoading: false };
    case GET_ORDER_FAILED:
      return { ...state, hasError: true, isLoading: false, errorMessage: action.payload };
    default:
      return state;
  }
};