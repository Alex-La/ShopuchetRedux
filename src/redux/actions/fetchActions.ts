import {show} from '../../utils/snackbar';
import {AppDispatch} from '../store';
import {SetIsAuthAction} from '../types/auth.types';
import {
  FETCH_ACTION_TYPES,
  SetAppLoadingAction,
  SetLoadingAction,
} from '../types/fetch.types';
import {setIsAuth} from './authActions';

export const setAppLoading = (loading: boolean): SetAppLoadingAction => ({
  type: FETCH_ACTION_TYPES.SET_APP_LOADING,
  payload: loading,
});

export const setLoading = (loading: boolean): SetLoadingAction => ({
  type: FETCH_ACTION_TYPES.SET_LOADING,
  payload: loading,
});

export const onError =
  (status: number, text?: string) => (dispatch: AppDispatch) => {
    console.log(status);
    dispatch<SetAppLoadingAction>(setAppLoading(false));
    if (status === 401) dispatch<SetIsAuthAction>(setIsAuth(false));
    else if (text) show({text, type: 'error'});
  };
