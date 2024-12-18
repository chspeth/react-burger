import { RefObject, ReactElement } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../services/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface IModalState {
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  title: string | null;
}

export interface IAuthState {
  user: {
    email: string;
    name: string;
  } | null;
  accessToken: string | null;
  refreshToken:  string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasError: boolean;
  passwordResetRequested: boolean;
  passwordResetSuccess: boolean;
  authChecked: boolean;
}

export interface IIngredientBase {
  _id: string;
  name: string;
  type: 'bun' | 'sauce' | 'main';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IIngredientWithId extends IIngredientBase {
  id: string;
}

export interface IConstructorState {
  bun: IIngredientWithId | null;
  fillings: IIngredientWithId[];
}

export interface IConstructorIngredientProps {
  element: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  handleDeleteItem: (id: string) => void;
}

export interface IDragItem {
  index: number;
  id: string;
  type: string;
}

export type TTabsRefs = {
  [name in 'bun' | 'sauce' | 'main']: RefObject<HTMLDivElement>;
};

export type TCoordinates = {
  [name in 'bun' | 'sauce' | 'main']: number | undefined;
};

export interface IIngredientsTabsProps {
  currentTab: 'bun' | 'sauce' | 'main';
  onTabClick: (tabName: 'bun' | 'sauce' | 'main') => void;
}

export interface IIngredientsListProps {
  categoryType: string;
}

export interface IProductsState {
  productData: IIngredientBase[];
  isLoading: boolean;
  hasError: boolean;
}

export interface IIngredientItemProps {
  ingredient: IIngredientBase
}

export interface IConstructorItemsState {
  bun: IIngredientBase | null;
  fillings: IIngredientBase[];
}

export interface IModalProps {
  title?: string | null; 
  children: React.ReactNode; 
  onClose: () => void;
}

export interface IDetailsState {
  orderNumber: number | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
}

export interface IModalOverlayProps {
  onClose: () => void;
}

export interface IIndredientDetailsProps {
  ingredient?: IIngredientBase;
}

export interface IProductsState {
  productData: IIngredientBase[];
  isLoading: boolean;
  hasError: boolean;
}

export interface IProtectedNPublicRouteElementProps {
  element: ReactElement;
}

interface ICustomScrollbarStyles {
  wrapperMaxHeight?: string;
  wrapperHeight?: string;
  top?: string;
  bottom?: string;
}

export interface ICustomScrollbarProps {
  children: React.ReactNode;
  customStyles: ICustomScrollbarStyles;
  onScrollFrame?: (values: any) => void; 
}

export interface IUser {
  email: string;
  name: string;
}

export interface IAuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IDefaultResponse {
  success: boolean;
  message?: string;
}

export interface IOrder {
  _id: string;
  ingredients: string[];
  status: 'created' | 'pending' | 'done';
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IOrderResponse {
  success: boolean;
  orders: IOrder[];
}

export interface ICreateOrderResponse {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
}

export interface IIngredientsResponse {
  success: boolean;
  data: IIngredientBase[];
}

export type TOrderList = {
  success: boolean,
  orders: IOrder[];
  total: number;
  totalToday: number;
};

export type TRefreshToken = { 
  accessToken: string;
  refreshToken: string;
}