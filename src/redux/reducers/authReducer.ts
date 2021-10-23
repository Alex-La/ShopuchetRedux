import {
  AuthActions,
  AUTH_ACTION_TYPES,
  SetTokenAction,
  Token,
} from '../types/auth.types';

const initialState: Token = false;

export const token = (state: Token = initialState, action: AuthActions) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SET_TOKEN:
      const {token} = action as SetTokenAction;
      return token;
    default:
      return state;
  }
};
