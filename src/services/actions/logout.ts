import { BASE_URL, request } from '../../utils/util';
import { setCookie, getCookie } from '../../utils/cookie';
import { AppDispatch } from '../store';
import { IDefaultResponse } from '../../utils/types';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
  readonly payload: string;
}

export type TLogoutActions =
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction;

export const logoutFailed = (error: string): ILogoutFailedAction => ({
  type: LOGOUT_FAILED,
  payload: error,
});

const LOGOUT_URL = BASE_URL + '/auth/logout';

export function logoutUser() {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: LOGOUT_REQUEST
    });

    try {
      const data: IDefaultResponse = await request<IDefaultResponse>(LOGOUT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: getCookie('refreshToken') }) 
      });

      if (data && data.success) {
        setCookie('accessToken', '', { expires: -1 });
        setCookie('refreshToken', '', { expires: -1 });

        dispatch({
          type: LOGOUT_SUCCESS
        });
      } else {
        throw new Error('Failed to log out');
      } 
    } catch (err: any) {
      dispatch(logoutFailed(err.message));
      console.error('Error:', err);
    }
  }
}