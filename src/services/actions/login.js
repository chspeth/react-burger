import { BASE_URL, request } from '../../utils/util';
import { setCookie } from '../../utils/cookie';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const loginSuccess = (user, accessToken, refreshToken) => ({
  type: LOGIN_SUCCESS,
  payload: { user, accessToken, refreshToken },
});

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
});

const LOGIN_URL = BASE_URL + '/auth/login';

export function loginUser(email, password) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST
    });

    try {
      const data = await request(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) 
      });

      if (data && data.success) {
        const accessToken = data.accessToken.split('Bearer ')[1];
        const refreshToken = data.refreshToken;
        
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        dispatch(loginSuccess(data.user, accessToken, refreshToken));
      } else {
        throw new Error('Failed to log in');
      } 
    } catch (err) {
      dispatch(loginFailed(err.message));
      console.error('Error:', err);
    }
  }
};