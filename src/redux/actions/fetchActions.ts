import {show} from '../../utils/snackbar';
import {AppDispatch} from '../store';
import {FETCH_ACTION_TYPES, SetAppLoadingAction} from '../types/fetch.types';

export const setAppLoading = (loading: boolean): SetAppLoadingAction => ({
  type: FETCH_ACTION_TYPES.SET_APP_LOADING,
  payload: loading,
});

export const onError = (text: string) => (dispatch: AppDispatch) => {
  dispatch<SetAppLoadingAction>(setAppLoading(false));
  show({text, type: 'error'});
};
