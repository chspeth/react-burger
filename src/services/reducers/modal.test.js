import { initialState, modalReducer } from './modal';
import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';

describe('modalReducer', () => {
  it('should return the initial state', () => {
    expect(modalReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle OPEN_MODAL', () => {
    const payload = {
      content: <div>Test Content</div>,
      title: 'Test Title',
    };
    expect(modalReducer(initialState, { type: OPEN_MODAL, payload })).toEqual({
      ...initialState,
      modalContent: payload.content,
      isModalOpen: true,
      title: payload.title
    })
  });

  it('should handle CLOSE_MODAL', () => {
    expect(modalReducer(initialState, { type: CLOSE_MODAL })).toEqual({
      ...initialState,
      modalContent: null,
      isModalOpen: false,
      title: null
    })
  });
})