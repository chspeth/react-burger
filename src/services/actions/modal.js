export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (hasTitle) => ({
  type: OPEN_MODAL,
  payload: { hasTitle }
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})