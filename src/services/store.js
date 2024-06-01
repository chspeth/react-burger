import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer } from './reducers/rootReducer';
import initialState from './initialState';

export const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools()
  )

  return store;
}