import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_CONFIRM_REQUEST,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAILED
} from '../actions/password';

const initialState = {
  isLoading: false,
  success: false,
  error: null
}

export const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST:
    case PASSWORD_RESET_CONFIRM_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
      };
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };
    case PASSWORD_RESET_FAILED:
    case PASSWORD_RESET_CONFIRM_FAILED:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}