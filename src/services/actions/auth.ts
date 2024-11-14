import { TLoginActions } from './login';
import { TLogoutActions } from './logout';
import { TPasswordResetActions } from './password';
import { TRefreshTokenActions } from './refreshToken';
import { TRegisterActions } from './register';
import { TUserActions } from './user';

export const SET_AUTH_CHECKED: 'SET_AUTH_CHECKED' = 'SET_AUTH_CHECKED';

export type TSetAuthCheckedAction = {
  readonly type: typeof SET_AUTH_CHECKED;
}

export const setAuthChecked = (): TSetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED
});

export type TAuthActions =
  | TUserActions
  | TRegisterActions
  | TRefreshTokenActions
  | TLoginActions
  | TLogoutActions
  | TPasswordResetActions
  | TSetAuthCheckedAction;