export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (content, hasTitle) => {
  return {
    type: OPEN_MODAL,
    payload: { content, hasTitle },
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};