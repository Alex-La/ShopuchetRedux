export type Token = boolean;

export enum AUTH_ACTION_TYPES {
  SET_TOKEN = 'AUTH_ACTION/SET_TOKEN',
}

export type SetTokenAction = {
  type: string;
  token: Token;
};

export type AuthActions = SetTokenAction;
