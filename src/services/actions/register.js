import { BASE_URL, request } from '../../utils/util';
import { setCookie } from '../../utils/cookie';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const registerSuccess = (user, accessToken, refreshToken) => ({
  type: REGISTER_SUCCESS,
  payload: { user, accessToken, refreshToken },
});

export const registerFailed = (error) => ({
  type: REGISTER_FAILED,
  payload: error,
});

const REGISTER_URL = BASE_URL + '/auth/register';

export function registerUser({ email, password, name }) {
  return async (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST
    });

    try {
      const data = await request(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name }) 
      });

      if (data && data.success) {
        const accessToken = data.accessToken.split('Bearer ')[1];
        const refreshToken = data.refreshToken;
        
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        dispatch(registerSuccess(data.user, accessToken, refreshToken));
      } else {
        throw new Error('Failed to register');
      } 
    } catch (err) {
      dispatch(registerFailed(err.message));
      console.error('Error:', err);
    }
  }
}