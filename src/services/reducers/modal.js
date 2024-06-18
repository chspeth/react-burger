import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';

const initialState = {
  isModalOpen: false,
  hasTitle: false
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isModalOpen: true, hasTitle: action.payload.hasTitle };
    case CLOSE_MODAL:
      return { ...state, isModalOpen: false, hasTitle: false };
    default:
      return state;
  }
}

export default modalReducer;