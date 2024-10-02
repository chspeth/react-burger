export const SET_REDIRECT_PATH = 'SET_REDIRECT_PATH';
export const CLEAR_REDIRECT_PATH = 'CLEAR_REDIRECT_PATH';
export const SET_PENDING_ORDER = 'SET_PENDING_ORDER';
export const CLEAR_PENDING_ORDER = 'CLEAR_PENDING_ORDER';

export const setRedirectPath = (path) => ({
  type: SET_REDIRECT_PATH,
  payload: path,
});

export const clearRedirectPath = () => ({
  type: CLEAR_REDIRECT_PATH,
});

export const setPendingOrder = () => ({
  type: SET_PENDING_ORDER,
});

export const clearPendingOrder = () => ({
  type: CLEAR_PENDING_ORDER,
});
