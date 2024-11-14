import { BASE_URL, request } from '../../utils/util';
import { IAuthState } from '../../utils/types';
import { AppDispatch } from '../store';
import { IAuthResponse } from '../../utils/types';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: {
    user: IAuthState['user'];
    accessToken: string;
    refreshToken: string;
  };
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
  readonly payload: string;
}

export type TLoginActions = ILoginRequestAction | ILoginSuccessAction | ILoginFailedAction;

export const loginSuccess = (
  user: IAuthState['user'],
  accessToken: string,
  refreshToken: string
): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: { user, accessToken, refreshToken },
});

export const loginFailed = (error: string): ILoginFailedAction => ({
  type: LOGIN_FAILED,
  payload: error,
});

const LOGIN_URL = BASE_URL + '/auth/login';

export function loginUser(email: string, password: string) {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: LOGIN_REQUEST
    });

    try {
      const data: IAuthResponse = await request<IAuthResponse>(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) 
      });

      if (data && data.success) {
        const accessTokenRaw = data.accessToken;

        const accessToken = accessTokenRaw.startsWith('Bearer ') 
          ? accessTokenRaw.split('Bearer ')[1] 
          : accessTokenRaw;
        const refreshToken = data.refreshToken;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(loginSuccess(data.user, accessToken, refreshToken));
      } else {
        throw new Error('Failed to log in');
      } 
    } catch (err: any) {
      dispatch(loginFailed(err.message));
      console.error('Error:', err);
    }
  }
};
