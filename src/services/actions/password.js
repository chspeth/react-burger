import { BASE_URL, request } from '../../utils/util';

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';
export const PASSWORD_RESET_STATUS = 'PASSWORD_RESET_STATUS';

export const PASSWORD_RESET_CONFIRM_REQUEST = 'PASSWORD_RESET_CONFIRM_REQUEST';
export const PASSWORD_RESET_CONFIRM_SUCCESS = 'PASSWORD_RESET_CONFIRM_SUCCESS';
export const PASSWORD_RESET_CONFIRM_FAILED = 'PASSWORD_RESET_CONFIRM_FAILED';
export const PASSWORD_RESET_CONFIRM_STATUS = 'PASSWORD_RESET_CONFIRM_STATUS';

export const passwordResetFailed = (error) => ({
  type: PASSWORD_RESET_FAILED,
  payload: error,
});

export const passwordResetConfirmFailed = (error) => ({
  type: PASSWORD_RESET_CONFIRM_FAILED,
  payload: error,
});

const REQUEST_RESET_URL = BASE_URL + '/password-reset';
const RESET_URL = REQUEST_RESET_URL + '/reset';

export function passwordResetRequest(email) {
  return async (dispatch) => {
    dispatch({
      type: PASSWORD_RESET_REQUEST
    });

    try {
      const data = await request(REQUEST_RESET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }) 
      });

      if (data && data.success) {
        dispatch({ type: PASSWORD_RESET_SUCCESS });
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (err) {
      dispatch(passwordResetFailed(err.message));
      console.error('Error:', err);
    }
  }
}

export function passwordResetConfirm(password, token) {
  return async (dispatch) => {
    dispatch({
      type: PASSWORD_RESET_CONFIRM_REQUEST
    });

    try {
      const data = await request(RESET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, token }) 
      });

      if (data && data.success) {
        dispatch({ type: PASSWORD_RESET_CONFIRM_SUCCESS });
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (err) {
      dispatch(passwordResetConfirmFailed(err.message));
      console.error('Error:', err);
    }
  }
}