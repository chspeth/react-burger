import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";

const initialState = {
  modalContent: null,
  title: null,
  isModalOpen: false
};

export const modalReducer =(state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalContent: action.payload.content,
        isModalOpen: true,
        title: action.payload.title
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalContent: null,
        isModalOpen: false,
        title: null
      };
    default:
      return state;
  }
}