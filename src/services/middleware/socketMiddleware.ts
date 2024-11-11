import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../store';
import {
  TWsActions,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  IWsConnectionStartAction,
  IWsSendMessageAction,
} from '../actions/wsActions';

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWsActions) => {
      const { dispatch } = store;
      const { type } = action;

      switch (type) {
        case WS_CONNECTION_START: {
          const { payload } = action as IWsConnectionStartAction;
          socket = new WebSocket(payload); 

          socket.onopen = event => {
            dispatch({ type: WS_CONNECTION_SUCCESS });
          };

          socket.onerror = event => {
            dispatch({ type: WS_CONNECTION_ERROR, payload: event });
          };

          socket.onmessage = event => {
            const data = JSON.parse(event.data);
            dispatch({ type: WS_GET_MESSAGE, payload: data });
          };

          socket.onclose = event => {
            dispatch({ type: WS_CONNECTION_CLOSED });
          };
          break;
        }

        case WS_SEND_MESSAGE: {
          const { payload } = action as IWsSendMessageAction;
          if (socket) {
            socket.send(JSON.stringify(payload));
          }
          break;
        }

        case WS_CONNECTION_CLOSED: {
          if (socket) {
            socket.close();
          }
          break;
        }

        default:
          break;
      }

      next(action);
    };
  }) as Middleware;
};
