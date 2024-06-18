import { SET_MODAL_CONTENT, CLEAR_MODAL_CONTENT } from '../actions/modal-content';

const initialState = {
  content: null
}

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL_CONTENT:
      return { ...state, content: action.payload };
    case CLEAR_MODAL_CONTENT:
      return { ...state, content: null };
    default:
      return state;
  }
}

export default contentReducer;