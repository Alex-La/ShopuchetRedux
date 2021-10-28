import {AUTH_ACTION_TYPES, SetIsAuthAction} from '../types/auth.types';

export const SetIsAuth = (isAuth: boolean): SetIsAuthAction => ({
  type: AUTH_ACTION_TYPES.SET_IS_AUTH,
  payload: isAuth,
});
