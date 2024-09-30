import { BASE_URL, request } from '../../utils/util';
import { getCookie } from '../../utils/cookie';
import { refreshToken } from './refreshToken';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED  = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED  = 'UPDATE_USER_FAILED';

export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: { user },
});

export const getUserFailed = (error) => ({
  type: GET_USER_FAILED,
  payload: error,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: { user },
});

export const updateUserFailed = (error) => ({
  type: UPDATE_USER_FAILED,
  payload: error,
});

const USER_URL = BASE_URL + '/auth/user';

export const getUser = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST
    });

    try {
      const accessToken = getCookie('accessToken');

      const data = await request(USER_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      });

      dispatch(getUserSuccess(data.user));
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        try {
          await dispatch(refreshToken());
          const newAccessToken = getCookie('accessToken');

          const data = await request(USER_URL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + newAccessToken,
            },
          });

          dispatch(getUserSuccess(data.user));
        } catch (error) {
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

export const updateUser = (userData) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST
    });

    try {
      const accessToken = getCookie('accessToken');

      const data = await request(USER_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify(userData),
      });

      dispatch(updateUserSuccess(data.user));
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        try {
          await dispatch(refreshToken());
          const newAccessToken = getCookie('accessToken');

          const data = await request(USER_URL, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + newAccessToken,
            },
            body: JSON.stringify(userData),
          });

          dispatch(updateUserSuccess(data.user));
        } catch (err) {
          dispatch(updateUserFailed(err.message));
          console.error('Error:', err);
        }
      }
    }
  }
};