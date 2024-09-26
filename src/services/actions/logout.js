import { BASE_URL, request } from '../../utils/util';
import { setCookie, getCookie } from '../../utils/cookie';

export const LOGOUT_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_FAILED = 'LOGIN_FAILED';

export const logoutFailed = (error) => ({
  type: LOGOUT_FAILED,
  payload: error,
});

const LOGOUT_URL = BASE_URL + '/auth/logout';

export function logoutUser() {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST
    });

    try {
      const data = await request(LOGOUT_URL, {
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
        throw new Error('Failed to log in');
      } 
    } catch (err) {
      dispatch(logoutFailed(err.message));
      console.error('Error:', err);
    }
  }
}