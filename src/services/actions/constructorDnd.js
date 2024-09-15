import { v4 as uuidv4 } from 'uuid';

export const ADD_INITIAL_ITEM = 'ADD_ITEM';
export const ADD_USER_ITEM = 'ADD_USER_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const addInitialItem = (ingredient) => {
  return {
    type: ADD_INITIAL_ITEM,
    payload: {...ingredient, id: uuidv4()},
  }
}

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