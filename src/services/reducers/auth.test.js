import { initialState, authReducer } from './auth';
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
  LOGIN_SUCCESS,
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

import { SET_AUTH_CHECKED } from '../actions/auth';

describe('authReducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle REGISTER_REQUEST', () => {
    expect(authReducer(initialState, { type: REGISTER_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
      hasError: false,
    })
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(authReducer(initialState, { type: LOGIN_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
      hasError: false,
    })
  });

  it('should handle LOGOUT_REQUEST', () => {
    expect(authReducer(initialState, { type: LOGOUT_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
      hasError: false,
    })
  });

  it('should handle REFRESH_TOKEN_REQUEST', () => {
    expect(authReducer(initialState, { type: REFRESH_TOKEN_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
      hasError: false,
    })
  });

  it('should handle GET_USER_REQUEST', () => {
    expect(authReducer(initialState, { type: GET_USER_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
      hasError: false,
    })
  });

  it('should handle UPDATE_USER_REQUEST', () => {
    expect(authReducer(initialState, { type: UPDATE_USER_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
      hasError: false,
    })
  });

  it('should handle REGISTER_SUCCESS', () => {
    const payload = {
      user: { email: 'test@test.test', name: 'Name Surname' },
      accessToken: 'testAccessToken',
      refreshToken: 'testRefreshToken',
    };
    expect(
      authReducer(initialState, { type: REGISTER_SUCCESS, payload })
    ).toEqual({
      ...initialState,
      isLoading: false,
      hasError: false,
      isAuthenticated: true,
      user: payload.user,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      authChecked: true,
      passwordResetSuccess: false,
    })
  });

  it('should handle LOGIN_SUCCESS', () => {
    const payload = {
      user: { email: 'test@test.test', name: 'Name Surname' },
      accessToken: 'testAccessToken',
      refreshToken: 'testRefreshToken',
    };
    expect(
      authReducer(initialState, { type: LOGIN_SUCCESS, payload })
    ).toEqual({
      ...initialState,
      isLoading: false,
      hasError: false,
      isAuthenticated: true,
      user: payload.user,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      authChecked: true,
      passwordResetSuccess: false,
    })
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      authReducer(initialState, { type: LOGOUT_SUCCESS })
    ).toEqual({
      ...initialState,
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      hasError: false,
      authChecked: true,
      passwordResetRequested: false,
      passwordResetSuccess: false,
    })
  });

  it('should handle REFRESH_TOKEN_SUCCESS', () => {
    const payload = {
      accessToken: 'testAccessToken',
      refreshToken: 'testRefreshToken',
    };
    expect(
      authReducer(initialState, { type: REFRESH_TOKEN_SUCCESS, payload })
    ).toEqual({
      ...initialState,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      isAuthenticated: true,
      isLoading: false,
      hasError: false,
    })
  });

  it('should handle GET_USER_SUCCESS', () => {
    const payload = {
      user: { email: 'test@test.test', name: 'Name Surname' },
    };
    expect(
      authReducer(initialState, { type: GET_USER_SUCCESS, payload })
    ).toEqual({
      ...initialState,
      user: payload.user,
      isAuthenticated: true,
      isLoading: false,
      hasError: false,
      authChecked: true,
    })
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    const payload = {
      user: { email: 'test@test.test', name: 'Name Surname' },
    };
    expect(
      authReducer(initialState, { type: UPDATE_USER_SUCCESS, payload })
    ).toEqual({
      ...initialState,
      user: payload.user,
      isAuthenticated: true,
      isLoading: false,
      hasError: false,
      authChecked: true,
    })
  });

  it('should handle REGISTER_FAILED', () => {
    expect(
      authReducer(initialState, { type: REGISTER_FAILED })
    ).toEqual({
      ...initialState,
      isAuthenticated: false, 
      isLoading: false,
      hasError: true,
      authChecked: true,
    })
  });

  it('should handle LOGIN_FAILED', () => {
    expect(
      authReducer(initialState, { type: LOGIN_FAILED })
    ).toEqual({
      ...initialState,
      isAuthenticated: false, 
      isLoading: false,
      hasError: true,
      authChecked: true,
    })
  });

  it('should handle REFRESH_TOKEN_FAILED', () => {
    expect(
      authReducer(initialState, { type: REFRESH_TOKEN_FAILED })
    ).toEqual({
      ...initialState,
      isAuthenticated: false, 
      isLoading: false,
      hasError: true,
      authChecked: true,
    })
  });

  it('should handle GET_USER_FAILED', () => {
    expect(
      authReducer(initialState, { type: GET_USER_FAILED })
    ).toEqual({
      ...initialState,
      isAuthenticated: false, 
      isLoading: false,
      hasError: true,
      authChecked: true,
    })
  });

  it('should handle LOGOUT_FAILED', () => {
    expect(
      authReducer(initialState, { type: LOGOUT_FAILED })
    ).toEqual({
      ...initialState,
      isLoading: false, 
      hasError: true,
    })
  });

  it('should handle UPDATE_USER_FAILED', () => {
    expect(
      authReducer(initialState, { type: UPDATE_USER_FAILED })
    ).toEqual({
      ...initialState,
      isLoading: false, 
      hasError: true,
    })
  });

  it('should handle PASSWORD_RESET_REQUEST', () => {
    expect(
      authReducer(initialState, { type: PASSWORD_RESET_REQUEST })
    ).toEqual({
      ...initialState,
      isLoading: true, 
      hasError: false,
      passwordResetRequested: false
    })
  });

  it('should handle PASSWORD_RESET_SUCCESS', () => {
    expect(
      authReducer(initialState, { type: PASSWORD_RESET_SUCCESS })
    ).toEqual({
      ...initialState,
      isLoading: false, 
      hasError: false,
      passwordResetRequested: true
    })
  });

  it('should handle PASSWORD_RESET_FAILED', () => {
    expect(
      authReducer(initialState, { type: PASSWORD_RESET_FAILED })
    ).toEqual({
      ...initialState,
      isLoading: false, 
      hasError: true,
      passwordResetRequested: false
    })
  });

  it('should handle PASSWORD_RESET_STATUS', () => {
    expect(
      authReducer(initialState, { type: PASSWORD_RESET_STATUS })
    ).toEqual({
      ...initialState,
      isLoading: false, 
      hasError: false,
      passwordResetRequested: false
    })
  });

  it('should handle PASSWORD_RESET_CONFIRM_REQUEST', () => {
    expect(
      authReducer(initialState, { type: PASSWORD_RESET_CONFIRM_REQUEST })
    ).toEqual({
      ...initialState,
      isLoading: true, 
      hasError: false,
      passwordResetRequested: false
    })
  });

  it('should handle PASSWORD_RESET_CONFIRM_SUCCESS', () => {
    expect(
      authReducer(initialState, { type: PASSWORD_RESET_CONFIRM_SUCCESS })
    ).toEqual({
      ...initialState,
      isLoading: false, 
      hasError: false, 
      passwordResetSuccess: true,
      passwordResetRequested: false,
    })
  });

  it('should handle PASSWORD_RESET_CONFIRM_FAILED', () => {
    expect(
      authReducer(initialState, { type: PASSWORD_RESET_CONFIRM_FAILED })
    ).toEqual({
      ...initialState,
      isLoading: false, 
      hasError: true,
      passwordResetSuccess: false
    })
  });

  it('should handle PASSWORD_RESET_CONFIRM_STATUS', () => {
    expect(
      authReducer(initialState, { type: PASSWORD_RESET_CONFIRM_STATUS })
    ).toEqual({
      ...initialState,
      isLoading: false, 
      hasError: false,
      passwordResetSuccess: false
    })
  });

  it('should handle SET_AUTH_CHECKED', () => {
    expect(
      authReducer(initialState, { type: SET_AUTH_CHECKED })
    ).toEqual({
      ...initialState,
      authChecked: true
    })
  });
})