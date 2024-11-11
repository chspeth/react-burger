import { TModalActions } from './modal';
import { TItemsActions } from './productData';
import { TConstructorActions } from './constructorDnd';
import { TOrderActions } from './orderDetails';
import { TAuthActions } from '../reducers/auth'; 
import { TWsActions } from './wsActions';

export type TApplicationActions =
  | TModalActions
  | TItemsActions
  | TConstructorActions
  | TOrderActions
  | TAuthActions
  | TWsActions;
