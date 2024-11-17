import { initialState, orderReducer } from './orderDetails';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILED
} from '../actions/orderDetails';

describe('orderReducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle GET_ORDER_REQUEST', () => {
    expect(orderReducer(initialState, { type: GET_ORDER_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
      hasError: false,
      errorMessage: null
    })
  });

  it('should handle GET_ORDER_BY_ID_REQUEST', () => {
    expect(orderReducer(initialState, { type: GET_ORDER_BY_ID_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
      hasError: false,
      errorMessage: null
    })
  });

  it('should handle GET_ORDER_SUCCESS', () => {
    const payload = 1;
    expect(orderReducer(initialState, { type: GET_ORDER_SUCCESS, payload })).toEqual({
      ...initialState,
      isLoading: false,
      orderNumber: payload
    })
  });

  it('should handle GET_ORDER_BY_ID_SUCCESS', () => {
    const payload =  {
      number: 12345,
      status: 'done',
      ingredients: ['ingredient1', 'ingredient2'],
      createdAt: '2023-01-01T00:00:00.000Z',
      name: 'Order Name',
    };
    expect(orderReducer(initialState, { type: GET_ORDER_BY_ID_SUCCESS, payload })).toEqual({
      ...initialState,
      isLoading: false,
      selectedOrder: payload
    })
  });

  it('should handle GET_ORDER_FAILED', () => {
    const payload = 'Failed to fetch order';
    expect(orderReducer(initialState, { type: GET_ORDER_FAILED, payload })).toEqual({
      ...initialState,
      hasError: true,
      isLoading: false,
      errorMessage: payload,
    });
  });

  it('should handle GET_ORDER_BY_ID_FAILED', () => {
    const payload = 'Failed to fetch order';
    expect(orderReducer(initialState, { type: GET_ORDER_BY_ID_FAILED, payload })).toEqual({
      ...initialState,
      hasError: true,
      isLoading: false,
      errorMessage: payload,
    });
  });
})