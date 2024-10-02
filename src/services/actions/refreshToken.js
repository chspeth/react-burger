import { BASE_URL, request } from '../../utils/util';
import { setCookie, getCookie } from '../../utils/cookie';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export const refreshTokenSuccess = (accessToken, refreshToken) => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: { accessToken, refreshToken },
});

export const refreshTokenFailed = (error) => ({
  type: REFRESH_TOKEN_FAILED,
  payload: error,
});

const REFRESH_TOKEN_URL = BASE_URL + '/auth/token';

export const refreshToken = () => {
  return async (dispatch) => {
    dispatch({
      type: REFRESH_TOKEN_REQUEST
    });

    const refreshTokenCookie = getCookie('refreshToken');

    if (!refreshTokenCookie) {
      dispatch(refreshTokenFailed('No refresh token'));
      return;
    }

    try {
      const data = await request(REFRESH_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: refreshTokenCookie }) 
      });

      if (data && data.success) {
        const accessToken = data.accessToken.split('Bearer ')[1];
        const newRefreshToken = data.refreshToken;
        
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', newRefreshToken);
        dispatch(refreshTokenSuccess(accessToken, newRefreshToken));
        return accessToken;
      } else {
        throw new Error('Failed to refresh token');
      } 
    } catch (err) {
      dispatch(refreshTokenFailed(err.message));
      console.error('Error:', err);
      throw err; 
    }
  }
}