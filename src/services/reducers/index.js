import { combineReducers } from 'redux';
import { modalReducer } from './modal';
import { productsReducer } from './productData.js';

export const rootReducer = combineReducers({
  modal: modalReducer,
  products: productsReducer,
});