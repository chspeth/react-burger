import { TOrderList } from '../../utils/types';

export const WS_USER_CONNECTION_START: 'WS_USER_CONNECTION_START' = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS: 'WS_USER_CONNECTION_SUCCESS' = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_CONNECTION_CLOSED: 'WS_USER_CONNECTION_CLOSED' = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_CONNECTION_ERROR: 'WS_USER_CONNECTION_ERROR' = 'WS_USER_CONNECTION_ERROR';
export const WS_USER_GET_MESSAGE: 'WS_USER_GET_MESSAGE' = 'WS_USER_GET_MESSAGE';

export type TWSUserActions = {
  wsInit: typeof WS_USER_CONNECTION_START,
  onOpen: typeof WS_USER_CONNECTION_SUCCESS,
  onClose: typeof WS_USER_CONNECTION_CLOSED,
  onError: typeof WS_USER_CONNECTION_ERROR,
  onMessage: typeof WS_USER_GET_MESSAGE
};

export const wsUserActions: TWSUserActions = {
  wsInit: WS_USER_CONNECTION_START,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onMessage: WS_USER_GET_MESSAGE
} 

export type TUserWsConnectionStartAction = {
  readonly type: typeof WS_USER_CONNECTION_START;
  readonly payload: {url: string, token: boolean};
}

export type TUserWsConnectionSuccessAction = {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}

export type TUserWsConnectionErrorAction = {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
  readonly payload: string;
}

export type TUserWsConnectionClosedAction = {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
}

export type TUserWsGetMessageAction = {
  readonly type: typeof WS_USER_GET_MESSAGE;
  readonly payload: TOrderList;
}

export type TWSUserAllActions = 
| TUserWsConnectionStartAction
| TUserWsConnectionSuccessAction
| TUserWsConnectionErrorAction
| TUserWsConnectionClosedAction
| TUserWsGetMessageAction;