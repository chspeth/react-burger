import { initialState, constructorReducer } from './constructorDnd';
import { 
  ADD_USER_ITEM, 
  DELETE_ITEM,
  MOVE_ITEM,
  CLEAR_CONSTRUCTOR
} from '../actions/constructorDnd';

describe('constructorReducer', () => {
  const testBun = {
    _id: '1',
    id: '1',
    name: 'Bun',
    type: 'bun',
  }

  const testMain = {
    _id: '2',
    id: '2',
    name: 'Main',
    type: 'main',
  }

  const testSauce = {
    _id: '3',
    id: '3',
    name: 'Sauce',
    type: 'sauce',
  }

  it('should return the initial state', () => {
    expect(constructorReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle ADD_USER_ITEM with type "bun"', () => {
    const payload = testBun;
    expect(
      constructorReducer(initialState, { type: ADD_USER_ITEM, payload })
    ).toEqual({
      ...initialState,
      bun: payload
    })
  });

  it('should handle ADD_USER_ITEM with type not "bun"', () => {
    const payload = testMain;
    expect(
      constructorReducer(initialState, { type: ADD_USER_ITEM, payload })
    ).toEqual({
      ...initialState,
      fillings: [...initialState.fillings, payload]
    })
  });

  it('should handle DELETE_ITEM', () => {
    const payload = '2';
    expect(
      constructorReducer(
        { ...initialState, fillings: [testMain, testSauce] }, 
        { type: DELETE_ITEM, payload }
      )
    ).toEqual({
      ...initialState,
      fillings: [testSauce]
    })
  });

  it('should handle MOVE_ITEM', () => {
    const payload = { dragIndex: 0, hoverIndex: 1 };
    expect(
      constructorReducer(
        { ...initialState, fillings: [testMain, testSauce] }, 
        { type: MOVE_ITEM, payload }
      )
    ).toEqual({
      ...initialState,
      fillings: [testSauce, testMain]
    })
  });

  it('should handle CLEAR_CONSTRUCTOR', () => {
    expect(
      constructorReducer(
        { ...initialState, fillings: [testMain, testSauce, testBun] }, 
        { type: CLEAR_CONSTRUCTOR }
      )
    ).toEqual({
      ...initialState,
      bun: null,
      fillings: []
    })
  });
})