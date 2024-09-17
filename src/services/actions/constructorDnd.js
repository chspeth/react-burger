import { v4 as uuidv4 } from 'uuid';

export const ADD_USER_ITEM = 'ADD_USER_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const MOVE_ITEM = 'MOVE_ITEM';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addUserItem = (ingredient) => {
  return {
    type: ADD_USER_ITEM,
    payload: {...ingredient, id: uuidv4()},
  }
}

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id,
  }
}

export const moveItem = (dragIndex, hoverIndex) => {
  return {
    type: MOVE_ITEM,
    payload: { dragIndex, hoverIndex },
  };
};

export const clearConstructor = () => ({
  type: CLEAR_CONSTRUCTOR,
});