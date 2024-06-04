import { 
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_ERROR
} from "../actions/burger-ingredients";

const initialState = {
  ingredients: [],
  isLoading: false,
  hasError: null
}

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: null
      }
    case FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ingredients: action.payload.data
      }
    case FETCH_INGREDIENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: action.payload
      }
    default:
      return state;
  }
}

export default ingredientsReducer;