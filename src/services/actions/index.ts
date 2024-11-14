import { TModalActions } from './modal';
import { TItemsActions } from './productData';
import { TConstructorActions } from './constructorDnd';
import { TOrderActions } from './orderDetails';
import { TAuthActions } from './auth'; 
import { TWSPublicAllActions } from './wsPublicActions';
import { TWSUserAllActions } from './wsUserActions';

export type TApplicationActions =
  | TModalActions
  | TItemsActions
  | TConstructorActions
  | TOrderActions
  | TAuthActions
  | TWSPublicAllActions
  | TWSUserAllActions;
