import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../store';
import { TWSPublicActions } from '../actions/wsPublicActions';
import { TWSUserActions } from '../actions/wsUserActions';
import { checkTokenExpire } from '../actions/refreshToken';
import { TApplicationActions } from '../actions';

type TWSActions = TWSPublicActions | TWSUserActions;

export const socketMiddleware = (wsActions: TWSActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let isSocketOpen: boolean;
    let wsInitAction: TApplicationActions | null = null;

    return next => async (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        wsInitAction = action;

        const tokenIsValid = await checkTokenExpire();
        if (!tokenIsValid) {
          console.error('Token validation failed before WebSocket connection');
          return;
        }

        const accessToken = localStorage.getItem('accessToken');
        const token = action.payload.token ? `?token=${accessToken}` : '';
        socket = new WebSocket(`${action.payload.url}${token}`);
        isSocketOpen = true;
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        if (type === onClose) {
          if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) socket.close(); 
          isSocketOpen = false;
        }

        socket.onerror = event => {
          dispatch({ type: onError, payload: String(event) });
          if (isSocketOpen && wsInitAction) dispatch(wsInitAction);
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restData } = parsedData;
          if (success) {
            dispatch({ type: onMessage, payload: restData })
          } else {
            if (restData.message === 'Invalid or missing token') checkTokenExpire();
            dispatch({ type: onError, payload: restData.message });
          }
        } 

        socket.onclose = event => {
          dispatch({ type: onClose, payload: String(event) });
          socket = null;
          if (isSocketOpen && wsInitAction) dispatch(wsInitAction);
        }
      }
      next(action);
    }
  }) as Middleware;
};