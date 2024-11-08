import { TModalActions } from './modal';
import { TItemsActions } from './productData';
import { TConstructorActions } from './constructorDnd';
import { TOrderActions } from './orderDetails';
import { TAuthActions } from '../reducers/auth'; 

export type TApplicationActions =
  | TModalActions
  | TItemsActions
  | TConstructorActions
  | TOrderActions
  | TAuthActions;
