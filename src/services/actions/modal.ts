export const OPEN_MODAL: 'OPEN_MODAL' = 'OPEN_MODAL';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';

export interface IOpenModalAction {
  readonly type: typeof OPEN_MODAL;
  readonly payload: {
    content: React.ReactNode;
    title: string | null;
  };
}

export interface ICloseModalAction {
  readonly type: typeof CLOSE_MODAL;
}

export type TModalActions = IOpenModalAction | ICloseModalAction;

export const openModal = (content: React.ReactNode, title: string | null =  null): IOpenModalAction => {
  return {
    type: OPEN_MODAL,
    payload: { content, title },
  };
};

export const closeModal = (): ICloseModalAction => {
  return {
    type: CLOSE_MODAL,
  };
};