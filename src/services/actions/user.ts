import { BASE_URL, request } from '../../utils/util';
import { refreshToken } from './refreshToken';
import { AppDispatch, AppThunk } from '../store';
import { IUser, IAuthResponse } from '../../utils/types';
import { setAuthChecked } from './auth';

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
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) { 
      dispatch(getUserFailed('No access token'));
      dispatch(setAuthChecked());
      return;
    }

    dispatch({ type: GET_USER_REQUEST });

    try {
      const data: IAuthResponse = await request<IAuthResponse>(USER_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      });

      if (data && data.success) {
        dispatch(getUserSuccess(data.user));
      } else {
        throw new Error('Failed to get user data');
      }
    } catch (err: any) {
      if (err.status === 401 || err.status === 403 || err.message === 'jwt expired') {
        try {
          await dispatch(refreshToken());
          const newAccessToken = localStorage.getItem('accessToken');

          if (newAccessToken) {
            const data: IAuthResponse = await request<IAuthResponse>(USER_URL, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + newAccessToken,
              },
            });

            if (data && data.success) {
              dispatch(getUserSuccess(data.user));
              return;
            }
          }
        } catch (refreshErr: any) {
          dispatch(getUserFailed(refreshErr.message));
        }
      } else {
        dispatch(getUserFailed(err.message));
      }
    } finally {
      dispatch(setAuthChecked());
    }
  }
};

export const updateUser = (userData: { email: string; password: string; name: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST
    });

    const accessToken = localStorage.getItem('accessToken');

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
        const refreshTokenCookie = localStorage.getItem('refreshToken');

        if (!refreshTokenCookie) {
          dispatch(updateUserFailed('No refresh token'));
          return;
        }

        try {
          await dispatch(refreshToken());
          const newAccessToken = localStorage.getItem('accessToken');

          if (newAccessToken) {
            const data: IAuthResponse = await request<IAuthResponse>(USER_URL, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + newAccessToken,
              },
              body: JSON.stringify(userData),
            });

            dispatch(updateUserSuccess(data.user));
          }
        } catch (refreshErr: any) {
          dispatch(updateUserFailed(refreshErr.message));
          console.error('Error:', refreshErr);
        }
      }  else {
        dispatch(updateUserFailed(err.message));
        console.error('Error:', err);
      }
    }
  }
};