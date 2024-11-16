import { initialState, productsReducer } from './productData';
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from '../actions/productData';

describe('productsReducer', () => {
  it('should return the initial state', () => {
    expect(productsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle GET_ITEMS_REQUEST', () => {
    expect(productsReducer(initialState, { type: GET_ITEMS_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
      hasError: false,
    })
  });

  it('should handle GET_ITEMS_SUCCESS', () => {
    const payload = {
      _id: '',
      name: '',
      type: 'bun' | 'sauce' | 'main',
      price: 1,
    };
    expect(productsReducer(initialState, { type: GET_ITEMS_SUCCESS, payload })).toEqual({
      ...initialState,
      productData: payload, 
      isLoading: false
    })
  });

  it('should handle GET_ITEMS_FAILED', () => {
    expect(productsReducer(initialState, { type: GET_ITEMS_FAILED })).toEqual({
      ...initialState,
      isLoading: false,
      hasError: true,
    })
  });
})