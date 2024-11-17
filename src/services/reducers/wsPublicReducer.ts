import {
  WS_PUBLIC_CONNECTION_START,
  WS_PUBLIC_CONNECTION_SUCCESS,
  WS_PUBLIC_CONNECTION_ERROR,
  WS_PUBLIC_CONNECTION_CLOSED,
  WS_PUBLIC_GET_MESSAGE,
  TWSPublicAllActions,
} from '../actions/wsPublicActions';
import { TOrderList } from '../../utils/types';

export interface IWsPublicState {
  wsConnected: boolean;
  messages: TOrderList;
  error?: Event;
}

export const initialState: IWsPublicState = {
  wsConnected: false,
  messages: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const wsPublicReducer = (
  state = initialState,
  action: TWSPublicAllActions
) => {
  switch (action.type) {
    case WS_PUBLIC_CONNECTION_START:
      return {
        ...state,
        wsConnected: false,
        error: '',
      };
    case WS_PUBLIC_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: '',
      };
    case WS_PUBLIC_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    case WS_PUBLIC_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: '',
      };
    case WS_PUBLIC_GET_MESSAGE:
      return {
        ...state,
        messages: action.payload,
        error: ''
      };
    default:
      return state;
  }
};
