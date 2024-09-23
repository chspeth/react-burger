import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../actions/orderDetails.js';

const initialState = {
  orderNumber: null,
  isLoading: false,
  hasError: false,
  errorMessage: null
}

export const orderReducer = (state = initialState, action) => {
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