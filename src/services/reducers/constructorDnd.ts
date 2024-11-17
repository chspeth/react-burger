import { 
  ADD_USER_ITEM, 
  DELETE_ITEM,
  MOVE_ITEM,
  CLEAR_CONSTRUCTOR
} from '../actions/constructorDnd';

import { TConstructorActions } from '../actions/constructorDnd';
import { IConstructorState } from '../../utils/types';

export const initialState: IConstructorState = {
  bun: null,
  fillings: [],
};

export const constructorReducer = (
  state: IConstructorState = initialState, 
  action: TConstructorActions 
): IConstructorState => {
  switch (action.type) { 
    case ADD_USER_ITEM: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload
        }
      } else {
        return {
          ...state,
          fillings: [...state.fillings, action.payload]
        }
      }
    }
    case DELETE_ITEM: {
      return {
        ...state,
        fillings: state.fillings.filter(item => item.id !== action.payload)
      }
    }
    case MOVE_ITEM: {
      const fillings = [...state.fillings];
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = fillings[dragIndex];
      fillings.splice(dragIndex, 1);
      fillings.splice(hoverIndex, 0, draggedItem);
      return {
        ...state,
        fillings,
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        bun: null,
        fillings: []
      }
    }
    default:
      return state;
  }
}