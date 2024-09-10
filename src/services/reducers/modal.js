const initialState = {
  modalContent: null,
  hasTitle: false,
  isModalOpen: false
};

export const modalReducer =(state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modalContent: action.payload.content,
        isModalOpen: true,
        hasTitle: action.payload.hasTitle
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalContent: null,
        isModalOpen: false,
        hasTitle: false
      };
    default:
      return state;
  }
}