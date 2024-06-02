import { combineReducers } from 'redux';
import ingredientsReducer from './burger-ingredients';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer
});

export default rootReducer;