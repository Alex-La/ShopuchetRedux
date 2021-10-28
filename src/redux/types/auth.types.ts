type IsAuth = boolean;

export type Auth = {
  isAuth: IsAuth;
};

export enum AUTH_ACTION_TYPES {
  SET_IS_AUTH = 'AUTH_ACTION/SET_IS_AUTH',
}

export type SetIsAuthAction = {
  type: string;
  payload: IsAuth;
};

export type AuthActions = SetIsAuthAction;
