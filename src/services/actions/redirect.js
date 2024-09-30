export const SET_REDIRECT_PATH = 'SET_REDIRECT_PATH';
export const CLEAR_REDIRECT_PATH = 'CLEAR_REDIRECT_PATH';

export const setRedirectPath = (path) => ({
  type: SET_REDIRECT_PATH,
  payload: path,
});

export const clearRedirectPath = () => ({
  type: CLEAR_REDIRECT_PATH,
});
