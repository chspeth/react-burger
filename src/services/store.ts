import { createStore, compose, applyMiddleware, AnyAction } from 'redux';
import { thunk, ThunkDispatch, ThunkAction } from 'redux-thunk';
import { rootReducer } from './reducers';
import { TApplicationActions } from './actions';
import { socketMiddleware } from './middleware/socketMiddleware';
import { wsPublicActions } from './actions/wsPublicActions';
import { wsUserActions } from './actions/wsUserActions';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppDispatchAny = ThunkDispatch<RootState, unknown, AnyAction>;

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk, 
    socketMiddleware(wsPublicActions),
    socketMiddleware(wsUserActions),
  )
);

const store = createStore(rootReducer, enhancer);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export default store;