import { 
  ADD_INITIAL_ITEM, 
  ADD_USER_ITEM, 
  DELETE_ITEM,
  MOVE_ITEM
} from "../actions/constructorDnd";

const initialState = {
  bun: null,
  fillings: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INITIAL_ITEM: 
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
    default:
      return state;
  }
}