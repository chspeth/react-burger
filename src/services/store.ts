import { createStore, compose, applyMiddleware } from 'redux';
import { thunk, ThunkDispatch, ThunkAction } from 'redux-thunk';
import { rootReducer } from './reducers';
import { TApplicationActions } from './actions/actions';
import { socketMiddleware } from './middleware/socketMiddleware';

export type RootState = ReturnType<typeof rootReducer>;

export const wsUrl = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl)));

const store = createStore(rootReducer, enhancer);

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export default store;