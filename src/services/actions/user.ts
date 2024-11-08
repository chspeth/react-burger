import { BASE_URL, request } from '../../utils/util';
import { getCookie } from '../../utils/cookie';
import { refreshToken } from './refreshToken';
import { AppDispatch, AppThunk } from '../store';
import { IUser, IAuthResponse } from '../../utils/types';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: {
    user: {
      email: string;
      name: string;
    };
  };
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
  readonly payload: string;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: {
    user: {
      email: string;
      name: string;
    };
  };
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly payload: string;
}

export type TUserActions =
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction;

export const getUserSuccess = (
  user: IUser
): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  payload: { user },
});

export const getUserFailed = (error: string): IGetUserFailedAction => ({
  type: GET_USER_FAILED,
  payload: error,
});

export const updateUserSuccess = (
  user: IUser
): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  payload: { user },
});

export const updateUserFailed = (error: string): IUpdateUserFailedAction => ({
  type: UPDATE_USER_FAILED,
  payload: error,
});

const USER_URL = BASE_URL + '/auth/user';

export const getUser = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_REQUEST
    });

    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      dispatch(getUserFailed('No access token'));
      return;
    }
    try {
      const data: IAuthResponse = await request<IAuthResponse>(USER_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      });

      dispatch(getUserSuccess(data.user));
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        const refreshTokenCookie = getCookie('refreshToken');

        if (!refreshTokenCookie) {
          dispatch(getUserFailed('No refresh token'));
          return;
        }

        try {
          await dispatch(refreshToken() as any);
          const newAccessToken = getCookie('accessToken');

          const data: IAuthResponse = await request<IAuthResponse>(USER_URL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + newAccessToken,
            },
          });

          dispatch(getUserSuccess(data.user));
        } catch (error: any) {
          dispatch(getUserFailed(error.message));
          console.error('Error:', error);
        }
      } else {
        dispatch(getUserFailed(err.message));
        console.error('Error:', err);
      }
    }
  }
};

export const updateUser = (userData: { email: string; password: string; name: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST
    });

    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      dispatch(updateUserFailed('No access token'));
      return;
    }

    try {
      const data: IAuthResponse = await request<IAuthResponse>(USER_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify(userData),
      });

      dispatch(updateUserSuccess(data.user));
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        const refreshTokenCookie = getCookie('refreshToken');

        if (!refreshTokenCookie) {
          dispatch(updateUserFailed('No refresh token'));
          return;
        }

        try {
          await dispatch(refreshToken() as any);
          const newAccessToken = getCookie('accessToken');

          const data: IAuthResponse = await request<IAuthResponse>(USER_URL, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + newAccessToken,
            },
            body: JSON.stringify(userData),
          });

          dispatch(updateUserSuccess(data.user));
        } catch (err: any) {
          dispatch(updateUserFailed(err.message));
          console.error('Error:', err);
        }
      }  else {
        dispatch(updateUserFailed(err.message));
        console.error('Error:', err);
      }
    }
  }
};