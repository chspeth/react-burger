import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';
import { TModalActions } from '../actions/modal';
import { IModalState } from '../../utils/types';

export const initialState: IModalState = {
  modalContent: null,
  title: null,
  isModalOpen: false
};

export const modalReducer =(
  state = initialState, 
  action: TModalActions): IModalState => {
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