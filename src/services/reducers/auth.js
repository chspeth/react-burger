import { 
  REGISTER_REQUEST,
  REGISTER_FAILED,
  REGISTER_SUCCESS
} from '../actions/register';

import { 
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_FAILED,
  REFRESH_TOKEN_SUCCESS
} from '../actions/refreshToken';

 import { 
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS
} from '../actions/login';

 import { 
  LOGOUT_REQUEST,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS
} from '../actions/logout';

import { 
  GET_USER_REQUEST,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS
} from '../actions/user';

import { 
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_CONFIRM_REQUEST,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAILED,
  PASSWORD_RESET_STATUS,
  PASSWORD_RESET_CONFIRM_STATUS
} from '../actions/password';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  isAuthenticated: false,
  hasError: false,
  passwordResetRequested: false,
  passwordResetSuccess: false,
  authChecked: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case REFRESH_TOKEN_REQUEST:
    case GET_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return { ...state, isLoading: true, hasError: false };
    
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { 
        ...state, 
        isLoading: false, 
        hasError: false,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        authChecked: true,
        passwordResetSuccess: false,
      };
    
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        hasError: false,
        authChecked: true,
        passwordResetRequested: false,
        passwordResetSuccess: false,
      };

    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        hasError: false,
      };

    case GET_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        hasError: false,
        authChecked: true,
      };

    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case REFRESH_TOKEN_FAILED:
    case GET_USER_FAILED:
      return {
        ...state,
        isAuthenticated: false, 
        isLoading: false,
        hasError: true,
        authChecked: true,
      };

    case LOGOUT_FAILED:
    case UPDATE_USER_FAILED:
      return { 
        ...state, 
        isLoading: false, 
        hasError: true,
      };
      
    case PASSWORD_RESET_REQUEST:
      return { ...state, isLoading: true, hasError: false, passwordResetRequested: false };
    case PASSWORD_RESET_SUCCESS:
      return { ...state, isLoading: false, hasError: false, passwordResetRequested: true };
    case PASSWORD_RESET_FAILED:
      return { ...state, isLoading: false, hasError: true, passwordResetRequested: false };
    case PASSWORD_RESET_STATUS:
      return { ...state, isLoading: false, hasError: false, passwordResetRequested: false };
    case PASSWORD_RESET_CONFIRM_REQUEST:
      return { ...state, isLoading: true, hasError: false, passwordResetSuccess: false };
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return { 
        ...state, 
        isLoading: false, 
        hasError: false, 
        passwordResetSuccess: true,
        passwordResetRequested: false,
      };
    case PASSWORD_RESET_CONFIRM_FAILED:
      return { ...state, isLoading: false, hasError: true, passwordResetSuccess: false };
    case PASSWORD_RESET_CONFIRM_STATUS:
      return { ...state, isLoading: false, hasError: false, passwordResetSuccess: false };
    default:
      return state;
  }
}