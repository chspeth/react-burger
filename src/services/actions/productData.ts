import { BASE_URL, request } from '../../utils/util';
import { AppDispatch } from '../store';
import { IIngredientBase } from '../../utils/types';
import { IIngredientsResponse } from '../../utils/types';

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export interface IGetItemsRequestAction {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccessAction {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly payload: IIngredientBase[];
}

export interface IGetItemsFailedAction {
  readonly type: typeof GET_ITEMS_FAILED;
}

export type TItemsActions =
  | IGetItemsRequestAction
  | IGetItemsSuccessAction
  | IGetItemsFailedAction;

const API_URL = BASE_URL + '/ingredients';

export const getItemsRequest = (): IGetItemsRequestAction => ({
  type: GET_ITEMS_REQUEST,
});

export const getItemsSuccess = (items: IIngredientBase[]): IGetItemsSuccessAction => ({
  type: GET_ITEMS_SUCCESS,
  payload: items,
});

export const getItemsFailed = (): IGetItemsFailedAction => ({
  type: GET_ITEMS_FAILED,
});

export function getItems() {
  return async (dispatch: AppDispatch) => {
    dispatch(getItemsRequest());

    try {
      const data: IIngredientsResponse = await request<IIngredientsResponse>(API_URL, {
        method: 'GET'
      });
      dispatch(getItemsSuccess(data.data));
    } catch (err) {
      dispatch(getItemsFailed())
      console.error('Error:', err);
    }
  };
}