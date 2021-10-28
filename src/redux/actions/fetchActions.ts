import {show} from '../../utils/snackbar';
import {AppDispatch} from '../store';
import {
  FETCH_ACTION_TYPES,
  SetAppLoading,
  SetLoading,
} from '../types/fetch.types';

export const setAppLoading = (loading: boolean): SetAppLoading => ({
  type: FETCH_ACTION_TYPES.SET_APP_LOADING,
  payload: loading,
});

export const setLoading = (loading: boolean): SetLoading => ({
  type: FETCH_ACTION_TYPES.SET_LOADING,
  payload: loading,
});

export const onError = (text: string) => (dispatch: AppDispatch) => {
  dispatch<SetAppLoading>(setAppLoading(false));
  dispatch<SetLoading>(setLoading(false));
  show({text, type: 'error'});
};
