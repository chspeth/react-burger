import { combineReducers } from 'redux';
import ingredientsReducer from './burger-ingredients';
import constructorReducer from './burger-constructor';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer
});

export default rootReducer;