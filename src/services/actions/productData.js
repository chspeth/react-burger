export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export function getItems() {
  return async (dispatch) => {
    dispatch({
      type: GET_ITEMS_REQUEST
    });

    try {
      const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error('Network response err')
        }
        const data = await res.json();
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