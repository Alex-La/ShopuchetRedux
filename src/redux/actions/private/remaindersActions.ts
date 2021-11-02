import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api';
import {Remainder} from '../../../utils/api.types';
import {RootState} from '../../store';
import {
  REMAINDERS_ACTION_TYPES,
  SetLoadingAction,
  SetRemaindersAction,
  SortRemaindersAction,
} from '../../types/private/remainders.types';
import {handleError} from '../fetchActions';

const setLoading = (loading: boolean): SetLoadingAction => ({
  type: REMAINDERS_ACTION_TYPES.SET_LOADING,
  payload: loading,
});

export const setRemainders = (
  remainders: Remainder[],
): SetRemaindersAction => ({
  type: REMAINDERS_ACTION_TYPES.SET_REMAINDERS,
  payload: remainders,
});

export const sortRemainders = (reverse: boolean): SortRemaindersAction => ({
  type: REMAINDERS_ACTION_TYPES.SORT_REMAINDERS,
  payload: reverse,
});

export const getRemainders =
  (
    gtochkaid: number,
    limit?: number,
    cnt?: number,
    filter?: string,
  ): ThunkAction<
    void,
    RootState,
    unknown,
    SetRemaindersAction | SetLoadingAction
  > =>
  dispatch => {
    dispatch(setLoading(true));
    api
      .getRemainders(gtochkaid, limit || 50, cnt || 0, filter || '')
      .then(res => {
        dispatch(setRemainders(res.data));
        dispatch(setLoading(false));
      })
      .catch(e => {
        dispatch(setLoading(false));
        dispatch(handleError(e.response));
      });
  };
