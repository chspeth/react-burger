import { combineReducers } from 'redux';
import ingredientsReducer from './burger-ingredients';
import constructorReducer from './burger-constructor';
import modalReducer from './modal';
import contentReducer from './modal-content';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  modal: modalReducer,
  modalContent: contentReducer
});

export default rootReducer;