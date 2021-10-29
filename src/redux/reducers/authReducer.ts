import {AuthActions, AUTH_ACTION_TYPES, Auth} from '../types/auth.types';

const initialState: Auth = {
  isAuth: false,
};

export const auth = (state: Auth = initialState, action: AuthActions): Auth => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SET_IS_AUTH:
      return {isAuth: action.payload};
    default:
      return state;
  }
};
