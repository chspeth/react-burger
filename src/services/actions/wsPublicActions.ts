import { TOrderList } from '../../utils/types';

export const WS_PUBLIC_CONNECTION_START: 'WS_PUBLIC_CONNECTION_START' = 'WS_PUBLIC_CONNECTION_START';
export const WS_PUBLIC_CONNECTION_SUCCESS: 'WS_PUBLIC_CONNECTION_SUCCESS' = 'WS_PUBLIC_CONNECTION_SUCCESS';
export const WS_PUBLIC_CONNECTION_CLOSED: 'WS_PUBLIC_CONNECTION_CLOSED' = 'WS_PUBLIC_CONNECTION_CLOSED';
export const WS_PUBLIC_CONNECTION_ERROR: 'WS_PUBLIC_CONNECTION_ERROR' = 'WS_PUBLIC_CONNECTION_ERROR';
export const WS_PUBLIC_GET_MESSAGE: 'WS_PUBLIC_GET_MESSAGE' = 'WS_PUBLIC_GET_MESSAGE';

export type TWSPublicActions = {
  wsInit: typeof WS_PUBLIC_CONNECTION_START,
  onOpen: typeof WS_PUBLIC_CONNECTION_SUCCESS,
  onClose: typeof WS_PUBLIC_CONNECTION_CLOSED,
  onError: typeof WS_PUBLIC_CONNECTION_ERROR,
  onMessage: typeof WS_PUBLIC_GET_MESSAGE
};

export const wsPublicActions: TWSPublicActions = {
  wsInit: WS_PUBLIC_CONNECTION_START,
  onOpen: WS_PUBLIC_CONNECTION_SUCCESS,
  onClose: WS_PUBLIC_CONNECTION_CLOSED,
  onError: WS_PUBLIC_CONNECTION_ERROR,
  onMessage: WS_PUBLIC_GET_MESSAGE
} 

export type TPublicWsConnectionStartAction = {
  readonly type: typeof WS_PUBLIC_CONNECTION_START;
  readonly payload: {url: string, token: boolean};
}

export type TPublicWsConnectionSuccessAction = {
  readonly type: typeof WS_PUBLIC_CONNECTION_SUCCESS;
}

export type TPublicWsConnectionErrorAction = {
  readonly type: typeof WS_PUBLIC_CONNECTION_ERROR;
  readonly payload: string;
}

export type TPublicWsConnectionClosedAction = {
  readonly type: typeof WS_PUBLIC_CONNECTION_CLOSED;
}

export type TPublicWsGetMessageAction = {
  readonly type: typeof WS_PUBLIC_GET_MESSAGE;
  readonly payload: TOrderList;
}

export type TWSPublicAllActions = 
| TPublicWsConnectionStartAction
| TPublicWsConnectionSuccessAction
| TPublicWsConnectionErrorAction
| TPublicWsConnectionClosedAction
| TPublicWsGetMessageAction;