import {User} from '../../utils/api.types';

export type IsAuth = boolean;

export type Auth = {
  isAuth: IsAuth;
  user: User;
};

export enum AUTH_ACTION_TYPES {
  SET_IS_AUTH = 'AUTH_ACTION/SET_IS_AUTH',
  SET_USER = 'AUTH_ACTION/SET_USER',
}

export type SetIsAuthAction = {
  type: string;
  payload: IsAuth;
};

export type SetUserAction = {
  type: string;
  payload: User;
};

export type AuthActions = SetIsAuthAction | SetUserAction;
