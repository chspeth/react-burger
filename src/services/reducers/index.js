import { combineReducers } from 'redux';
import { modalReducer } from './modal';
import { productsReducer } from './productData';
import { constructorReducer } from './constructorDnd';
import { orderReducer } from './orderDetails';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  modal: modalReducer,
  products: productsReducer,
  constructorItems: constructorReducer,
  details: orderReducer,
  auth: authReducer
});