import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED
} from '../actions/productData.js';

const initialState = {
  productData: [],
  isLoading: false,
  hasError: false,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return { ...state, isLoading: true, hasError: false };
    case GET_ITEMS_SUCCESS:
      return { ...state, productData: action.payload, isLoading: false };
    case GET_ITEMS_FAILED:
      return { ...state, hasError: true, isLoading: false };
    default:
      return state;
  }
};