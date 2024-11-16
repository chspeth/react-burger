import { BASE_URL, request } from '../../utils/util';
import { AppDispatch } from '../store';
import { IDefaultResponse } from '../../utils/types';

export const PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST' = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS: 'PASSWORD_RESET_SUCCESS' = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED: 'PASSWORD_RESET_FAILED' = 'PASSWORD_RESET_FAILED';
export const PASSWORD_RESET_STATUS: 'PASSWORD_RESET_STATUS' = 'PASSWORD_RESET_STATUS';

export const PASSWORD_RESET_CONFIRM_REQUEST: 'PASSWORD_RESET_CONFIRM_REQUEST' = 'PASSWORD_RESET_CONFIRM_REQUEST';
export const PASSWORD_RESET_CONFIRM_SUCCESS: 'PASSWORD_RESET_CONFIRM_SUCCESS' = 'PASSWORD_RESET_CONFIRM_SUCCESS';
export const PASSWORD_RESET_CONFIRM_FAILED: 'PASSWORD_RESET_CONFIRM_FAILED' = 'PASSWORD_RESET_CONFIRM_FAILED';
export const PASSWORD_RESET_CONFIRM_STATUS: 'PASSWORD_RESET_CONFIRM_STATUS' = 'PASSWORD_RESET_CONFIRM_STATUS';

export interface IPasswordResetRequestAction {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}

export interface IPasswordResetSuccessAction {
  readonly type: typeof PASSWORD_RESET_SUCCESS;
}

export interface IPasswordResetFailedAction {
  readonly type: typeof PASSWORD_RESET_FAILED;
  readonly payload: string;
}

export interface IPasswordResetStatusAction {
  readonly type: typeof PASSWORD_RESET_STATUS;
}

export interface IPasswordResetConfirmRequestAction {
  readonly type: typeof PASSWORD_RESET_CONFIRM_REQUEST;
}

export interface IPasswordResetConfirmSuccessAction {
  readonly type: typeof PASSWORD_RESET_CONFIRM_SUCCESS;
}

export interface IPasswordResetConfirmFailedAction {
  readonly type: typeof PASSWORD_RESET_CONFIRM_FAILED;
  readonly payload: string;
}

export interface IPasswordResetConfirmStatusAction {
  readonly type: typeof PASSWORD_RESET_CONFIRM_STATUS;
}

export type TPasswordResetActions =
  | IPasswordResetRequestAction
  | IPasswordResetSuccessAction
  | IPasswordResetFailedAction
  | IPasswordResetStatusAction
  | IPasswordResetConfirmRequestAction
  | IPasswordResetConfirmSuccessAction
  | IPasswordResetConfirmFailedAction
  | IPasswordResetConfirmStatusAction;

export const passwordResetFailed = (error: string): IPasswordResetFailedAction => ({
  type: PASSWORD_RESET_FAILED,
  payload: error,
});

export const passwordResetConfirmFailed = (error: string): IPasswordResetConfirmFailedAction => ({
  type: PASSWORD_RESET_CONFIRM_FAILED,
  payload: error,
});

const REQUEST_RESET_URL = BASE_URL + '/password-reset';
const RESET_URL = REQUEST_RESET_URL + '/reset';

export function passwordResetRequest(email: string) {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: PASSWORD_RESET_REQUEST
    });

    try {
      const data: IDefaultResponse = await request<IDefaultResponse>(REQUEST_RESET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }) 
      });

      if (data && data.success) {
        dispatch({ type: PASSWORD_RESET_SUCCESS });
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (err: any) {
      dispatch(passwordResetFailed(err.message));
      console.error('Error:', err);
    }
  }
}

export function passwordResetConfirm(password: string, token: string) {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: PASSWORD_RESET_CONFIRM_REQUEST
    });

    try {
      const data: IDefaultResponse = await request<IDefaultResponse>(RESET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, token }) 
      });

      if (data && data.success) {
        dispatch({ type: PASSWORD_RESET_CONFIRM_SUCCESS });
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (err: any) {
      dispatch(passwordResetConfirmFailed(err.message));
      console.error('Error:', err);
    }
  }
}