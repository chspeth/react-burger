export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (content, title) => {
  return {
    type: OPEN_MODAL,
    payload: { content, title },
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};