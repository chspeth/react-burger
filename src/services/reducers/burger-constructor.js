import { ADD_ITEM, DELETE_ITEM } from "../actions/burger-constructor"

const initialState = {
  items: []
}

const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, ...action.payload.filter(item => !state.items.find(({ id }) => item.id === id))]
      };
    case DELETE_ITEM:
      const filteredItems = state.items.filter(item => item._id !== action.payload);
      return {
        ...state,
        items: filteredItems
      };
    default:
      return state;
  }
}

export default constructorReducer;