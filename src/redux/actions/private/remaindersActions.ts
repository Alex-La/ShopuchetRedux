import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api/api';
import {Remainder} from '../../../utils/api.types';
import {RootState} from '../../store';
import {
  ClearRemaindersAction,
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
  loadMore: boolean,
): SetRemaindersAction => ({
  type: REMAINDERS_ACTION_TYPES.SET_REMAINDERS,
  loadMore,
  payload: remainders,
});

export const clearRemainders = (): ClearRemaindersAction => ({
  type: REMAINDERS_ACTION_TYPES.CLEAR_REMAINDERS,
});

export const sortRemainders = (reverse: boolean): SortRemaindersAction => ({
  type: REMAINDERS_ACTION_TYPES.SORT_REMAINDERS,
  payload: reverse,
});

export const getRemainders =
  (
    loading: boolean,
    loadMore: boolean,
    gtochkaid: number,
    page: number = 0,
    cnt?: number,
    filter?: string,
  ): ThunkAction<
    void,
    RootState,
    unknown,
    SetRemaindersAction | SetLoadingAction
  > =>
  dispatch => {
    loading && dispatch(setLoading(true));
    api.remainders
      .getRemainders(gtochkaid, page, cnt, filter)
      .then(res => {
        dispatch(setRemainders(res.data, loadMore));
        dispatch(setLoading(false));
      })
      .catch(e => {
        dispatch(setLoading(false));
        dispatch(handleError(e.response));
      });
  };
