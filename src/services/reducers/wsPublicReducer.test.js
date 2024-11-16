import { initialState, wsPublicReducer } from './wsPublicReducer';
import {
  WS_PUBLIC_CONNECTION_START,
  WS_PUBLIC_CONNECTION_SUCCESS,
  WS_PUBLIC_CONNECTION_ERROR,
  WS_PUBLIC_CONNECTION_CLOSED,
  WS_PUBLIC_GET_MESSAGE,
} from '../actions/wsPublicActions';

describe('wsPublicReducer', () => {
  it('should return the initial state', () => {
    expect(wsPublicReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle  WS_PUBLIC_CONNECTION_START', () => {
    expect(wsPublicReducer(initialState, { type:  WS_PUBLIC_CONNECTION_START })).toEqual({
      ...initialState,
      wsConnected: false,
      error: '',
    })
  });

  it('should handle  WS_PUBLIC_CONNECTION_CLOSED', () => {
    expect(wsPublicReducer(initialState, { type:  WS_PUBLIC_CONNECTION_CLOSED })).toEqual({
      ...initialState,
      wsConnected: false,
      error: '',
    })
  });

  it('should handle  WS_PUBLIC_CONNECTION_SUCCESS', () => {
    expect(wsPublicReducer(initialState, { type:  WS_PUBLIC_CONNECTION_SUCCESS })).toEqual({
      ...initialState,
      wsConnected: true,
      error: '',
    })
  });

  it('should handle  WS_PUBLIC_CONNECTION_ERROR', () => {
    const payload = 'Failed to fetch order';
    expect(wsPublicReducer(initialState, { type:  WS_PUBLIC_CONNECTION_ERROR, payload })).toEqual({
      ...initialState,
      wsConnected: false,
      error: payload,
    })
  });

  it('should handle  WS_PUBLIC_GET_MESSAGE', () => {
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
    expect(wsPublicReducer(initialState, { type:  WS_PUBLIC_GET_MESSAGE, payload })).toEqual({
      ...initialState,
        messages: payload,
        error: ''
    })
  });
})