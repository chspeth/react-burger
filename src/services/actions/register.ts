import { BASE_URL, request } from '../../utils/util';
import { AppDispatch } from '../store';
import { IAuthResponse } from '../../utils/types';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: {
    user: {
      email: string;
      name: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
  readonly payload: string;
}

export type TRegisterActions =
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction;

export const registerSuccess = (
  user: { email: string; name: string },
  accessToken: string,
  refreshToken: string
): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  payload: { user, accessToken, refreshToken },
});

export const registerFailed = (error: string): IRegisterFailedAction => ({
  type: REGISTER_FAILED,
  payload: error,
});

const REGISTER_URL = BASE_URL + '/auth/register';

export function registerUser(userData: { email: string; password: string; name: string }) {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: REGISTER_REQUEST
    });

    try {
      const data: IAuthResponse = await request<IAuthResponse>(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) 
      });

      if (data && data.success) {
        const accessTokenRaw = data.accessToken;

        const accessToken = accessTokenRaw.startsWith('Bearer ') 
          ? accessTokenRaw.split('Bearer ')[1] 
          : accessTokenRaw;
        const refreshToken = data.refreshToken;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(registerSuccess(data.user, accessToken, refreshToken));
      } else {
        throw new Error('Failed to register');
      } 
    } catch (err: any) {
      dispatch(registerFailed(err.message));
      console.error('Error:', err);
    }
  }
}