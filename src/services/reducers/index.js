import { combineReducers } from 'redux';
import { modalReducer } from './modal';
import { productsReducer } from './productData';
import { constructorReducer } from './constructorDnd';

export const rootReducer = combineReducers({
  modal: modalReducer,
  products: productsReducer,
  constructorItems: constructorReducer
});