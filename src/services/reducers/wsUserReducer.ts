import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
  TWSUserAllActions
} from '../actions/wsUserActions';
import { TOrderList } from '../../utils/types';

export interface IWsUserState {
  wsConnected: boolean;
  messages: TOrderList;
  error?: Event;
}

const initialState: IWsUserState = {
  wsConnected: false,
  messages: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const wsUserReducer = (
  state = initialState,
  action: TWSUserAllActions
) => {
  switch (action.type) {
    case WS_USER_CONNECTION_START:
      return {
        ...state,
        wsConnected: true,
        error: '',
      };
    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: '',
      };
    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: '',
      };
    case WS_USER_GET_MESSAGE:
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state;
  }
};
