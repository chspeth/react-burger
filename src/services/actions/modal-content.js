export const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT';
export const CLEAR_MODAL_CONTENT = 'CLEAR_MODAL_CONTENT';

export const setModalContent = (content) => ({
  type: SET_MODAL_CONTENT,
  payload: content,
});

export const clearModalContent = () => ({
  type: CLEAR_MODAL_CONTENT,
});