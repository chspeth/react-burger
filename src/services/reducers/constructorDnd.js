import { ADD_INITIAL_ITEM, ADD_USER_ITEM, DELETE_ITEM } from "../actions/constructorDnd";

const initialState = {
  bun: null,
  fillings: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INITIAL_ITEM: 
    case ADD_USER_ITEM: {
      console.log(action.payload)
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
    default:
      return state;
  }
}