import { initialState, wsUserReducer } from './wsUserReducer';
import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
} from '../actions/wsUserActions';

describe('wsUserReducer', () => {
  it('should return the initial state', () => {
    expect(wsUserReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle  WS_USER_CONNECTION_START', () => {
    expect(wsUserReducer(initialState, { type:  WS_USER_CONNECTION_START })).toEqual({
      ...initialState,
      wsConnected: true,
      error: '',
    })
  });

  it('should handle  WS_USER_CONNECTION_SUCCESS', () => {
    expect(wsUserReducer(initialState, { type:  WS_USER_CONNECTION_SUCCESS })).toEqual({
      ...initialState,
      wsConnected: true,
      error: '',
    })
  });

  it('should handle  WS_USER_CONNECTION_ERROR', () => {
    const payload = 'Failed to fetch order';
    expect(wsUserReducer(initialState, { type:  WS_USER_CONNECTION_ERROR, payload })).toEqual({
      ...initialState,
      wsConnected: false,
      error: payload,
    })
  });

  it('should handle  WS_USER_CONNECTION_CLOSED', () => {
    expect(wsUserReducer(initialState, { type:  WS_USER_CONNECTION_CLOSED })).toEqual({
      ...initialState,
      wsConnected: false,
      error: '',
    })
  });

  it('should handle  WS_USER_GET_MESSAGE', () => {
    const payload = {
      success: true,
      orders: [{
        _id: '0',
        number: 3,
        name: 'Test Name',
      }],
      total: 1,
      totalToday: 2,
    };
    expect(wsUserReducer(initialState, { type:  WS_USER_GET_MESSAGE, payload })).toEqual({
      ...initialState,
        messages: payload,
        error: ''
    })
  });
})