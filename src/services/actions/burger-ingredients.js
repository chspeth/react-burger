const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR';

export const fetchIngredientsRequest = () => ({
  type: FETCH_INGREDIENTS_REQUEST,
  payload: []
}); 

export const fetchIngredientsSuccess = (data) => ({
  type: FETCH_INGREDIENTS_SUCCESS,
  payload: data
}); 

export const fetchIngredientsError = (error) => ({
  type: FETCH_INGREDIENTS_ERROR,
  payload: error
}); 

export const fetchIngredients = () => {
  return async (dispatch) => {
    dispatch(fetchIngredientsRequest());

    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error('Network response err')
      }
      const data = await res.json();
      dispatch(fetchIngredientsSuccess(data));
    } catch (error) {
      dispatch(fetchIngredientsError(error.message));
    } 
  }
}