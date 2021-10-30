import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThunkAction} from 'redux-thunk';
import api from '../../utils/api';
import {show} from '../../utils/snackbar';
import {RootState} from '../store';
import {AUTH_ACTION_TYPES, SetIsAuthAction} from '../types/auth.types';
import {SetAppLoadingAction} from '../types/fetch.types';
import {setAppLoading} from './fetchActions';

export const setIsAuth = (isAuth: boolean): SetIsAuthAction => ({
  type: AUTH_ACTION_TYPES.SET_IS_AUTH,
  payload: isAuth,
});

export const checkToken =
  (): ThunkAction<
    void,
    RootState,
    unknown,
    SetAppLoadingAction | SetIsAuthAction
  > =>
  dispatch => {
    dispatch(setAppLoading(true));
    AsyncStorage.getItem('accessToken').then(at => {
      if (at) dispatch(setIsAuth(true));
      dispatch(setAppLoading(false));
    });
  };

export const logout =
  (): ThunkAction<
    void,
    RootState,
    unknown,
    SetAppLoadingAction | SetIsAuthAction
  > =>
  dispatch => {
    dispatch(setAppLoading(true));
    AsyncStorage.removeItem('accessToken').then(() => {
      dispatch(setIsAuth(false));
      dispatch(setAppLoading(false));
    });
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
    api
      .login(username, password)
      .then(res => {
        AsyncStorage.setItem('accessToken', res.data['X-Auth-Token']).then(() =>
          AsyncStorage.setItem('refreshToken', res.data['Refresh-Token']).then(
            () => {
              dispatch(setIsAuth(true));
              dispatch(setAppLoading(false));
            },
          ),
        );
      })
      .catch(e => {
        dispatch(setAppLoading(false));
        show({text: e.response.data, type: 'error'});
      });
  };
