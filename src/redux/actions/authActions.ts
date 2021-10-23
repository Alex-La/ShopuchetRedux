import {AUTH_ACTION_TYPES, SetTokenAction} from '../types/auth.types';

export const SetToken = (token: boolean): SetTokenAction => ({
  type: AUTH_ACTION_TYPES.SET_TOKEN,
  token,
});
