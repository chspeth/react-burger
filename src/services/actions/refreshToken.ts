import { BASE_URL, request } from '../../utils/util';
import { AppDispatch } from '../store';
import { TRefreshToken } from '../../utils/types';

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED';

export interface IRefreshTokenRequestAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
  readonly payload: { accessToken: string; refreshToken: string };
}

export interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_FAILED;
  readonly payload: string;
}

export type TRefreshTokenActions =
  | IRefreshTokenRequestAction
  | IRefreshTokenSuccessAction
  | IRefreshTokenFailedAction;

  export const refreshTokenSuccess = (
    accessToken: string,
    refreshToken: string
  ): IRefreshTokenSuccessAction => ({
    type: REFRESH_TOKEN_SUCCESS,
    payload: { accessToken, refreshToken },
  });

export const refreshTokenFailed = (error: string): IRefreshTokenFailedAction => ({
  type: REFRESH_TOKEN_FAILED,
  payload: error,
});

export const refreshTokenRequest = (): IRefreshTokenRequestAction => ({
  type: REFRESH_TOKEN_REQUEST
});

const REFRESH_TOKEN_URL = BASE_URL + '/auth/token';

export const checkTokenExpire = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    console.error('No refresh token available');
    return false;
  }

  try {
    const data: TRefreshToken = await request<TRefreshToken>(REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: refreshToken })
    });

    if (data && data.accessToken && data.refreshToken) {
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken.split('Bearer ')[1]);
      return true;
    } else {
      console.error('Failed to refresh token');
      return false;
    }
  } catch (err) {
    console.error('Error during token refresh:', err);
    return false;
  }
};

export const refreshToken = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(refreshTokenRequest());

    try {
      const success = await checkTokenExpire();

      if (success) {
        const accessToken = localStorage.getItem('accessToken')!;
        const refreshToken = localStorage.getItem('refreshToken')!;
        dispatch(refreshTokenSuccess(accessToken, refreshToken));
        return accessToken;
      } else {
        dispatch(refreshTokenFailed('Failed to refresh token'));
        return null;
      }
    } catch (err: any) {
      dispatch(refreshTokenFailed(err.message));
      throw err;
    }
  };
};
