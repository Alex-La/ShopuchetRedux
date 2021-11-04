import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThunkAction} from 'redux-thunk';
import api from '../../utils/api/api';
import {User} from '../../utils/api.types';
import {RootState} from '../store';
import {
  AUTH_ACTION_TYPES,
  SetIsAuthAction,
  SetUserAction,
  UserLogoutAction,
} from '../types/auth.types';
import {SetAppLoadingAction} from '../types/fetch.types';
import {handleError, setAppLoading} from './fetchActions';
import {getTradePoints} from './private/mainActions';

const userLogout = (): UserLogoutAction => ({
  type: AUTH_ACTION_TYPES.USER_LOGOUT,
});

export const setIsAuth = (isAuth: boolean): SetIsAuthAction => ({
  type: AUTH_ACTION_TYPES.SET_IS_AUTH,
  payload: isAuth,
});

export const setUser = (user: User): SetUserAction => ({
  type: AUTH_ACTION_TYPES.SET_USER,
  payload: user,
});

export const getUser =
  (): ThunkAction<
    void,
    RootState,
    unknown,
    SetUserAction | SetAppLoadingAction
  > =>
  dispatch => {
    dispatch(setAppLoading(true));
    api.main
      .getUser()
      .then(res => {
        dispatch(setUser(res.data));
        dispatch(getTradePoints());
        dispatch(setIsAuth(true));
      })
      .catch(e => {
        console.log(e.status);
        dispatch(setAppLoading(false));
        dispatch(handleError(e.response));
      });
  };

export const logout =
  (): ThunkAction<
    void,
    RootState,
    unknown,
    SetAppLoadingAction | SetIsAuthAction | UserLogoutAction
  > =>
  dispatch => {
    dispatch(setAppLoading(true));
    AsyncStorage.removeItem('accessToken').then(() =>
      AsyncStorage.removeItem('refreshToken').then(() => {
        dispatch(setIsAuth(false));
        dispatch(setAppLoading(false));
        dispatch(userLogout());
      }),
    );
  };

export const login =
  (
    username: string,
    password: string,
  ): ThunkAction<
    void,
    RootState,
    unknown,
    SetAppLoadingAction | SetIsAuthAction
  > =>
  dispatch => {
    dispatch(setAppLoading(true));
    api.auth
      .login(username, password)
      .then(res => {
        AsyncStorage.setItem('accessToken', res.data['X-Auth-Token']).then(() =>
          AsyncStorage.setItem('refreshToken', res.data['Refresh-Token']).then(
            () => {
              dispatch(getUser());
            },
          ),
        );
      })
      .catch(e => {
        dispatch(setAppLoading(false));
        dispatch(handleError(e.response));
      });
  };
