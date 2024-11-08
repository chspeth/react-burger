import { v4 as uuidv4 } from 'uuid';
import { IIngredientBase, IIngredientWithId } from '../../utils/types';

export const ADD_USER_ITEM: 'ADD_USER_ITEM' = 'ADD_USER_ITEM';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const MOVE_ITEM: 'MOVE_ITEM' = 'MOVE_ITEM';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

export interface IAddUserItemAction {
  readonly type: typeof ADD_USER_ITEM;
  readonly payload: IIngredientWithId;
}

export interface IDeleteItemAction {
  readonly type: typeof DELETE_ITEM;
  readonly payload: string;
}

export interface IMoveItemAction {
  readonly type: typeof MOVE_ITEM;
  readonly payload: { dragIndex: number; hoverIndex: number };
}

export interface IClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorActions =
  | IAddUserItemAction
  | IDeleteItemAction
  | IMoveItemAction
  | IClearConstructorAction;

export const addUserItem = (ingredient: IIngredientBase): IAddUserItemAction => ({
  type: ADD_USER_ITEM,
  payload: {...ingredient, id: uuidv4()},
});

export const deleteItem = (id: string): IDeleteItemAction => ({
  type: DELETE_ITEM,
  payload: id,
});

export const moveItem = (dragIndex: number, hoverIndex: number): IMoveItemAction => ({
  type: MOVE_ITEM,
  payload: { dragIndex, hoverIndex },
});

export const clearConstructor = (): IClearConstructorAction => ({
  type: CLEAR_CONSTRUCTOR,
});