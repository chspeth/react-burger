import { BASE_URL } from '../../utils/util';
import { request } from '../../utils/util';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

const API_URL = BASE_URL + '/ingredients';

export function getItems() {
  return async (dispatch) => {
    dispatch({
      type: GET_ITEMS_REQUEST
    });

    try {
      const data = await request(API_URL, {
        method: 'GET'
      });
      dispatch({ 
        type: GET_ITEMS_SUCCESS,
        payload: data.data 
      });
    } catch (err) {
      dispatch({
        type: GET_ITEMS_FAILED,
      })
      console.error('Error:', err);
    }
  };
}