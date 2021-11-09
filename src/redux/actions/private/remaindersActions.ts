import {ThunkAction} from 'redux-thunk';
import {Remainders} from '../../../utils/api.types';
import api from '../../../utils/api/api';
import {RootState} from '../../store';
import {
  ClearRemaindersAction,
  RemaindersActions,
  REMAINDERS_ACTION_TYPES,
  SetDescendingAction,
  SetLoadingAction,
  SetRemaindersAction,
} from '../../types/private/remainders.types';
import {handleError} from '../fetchActions';

export const setLoading = (loading: boolean): SetLoadingAction => ({
  type: REMAINDERS_ACTION_TYPES.SET_LOADING,
  payload: loading,
});

export const setDescending = (descending: boolean): SetDescendingAction => ({
  type: REMAINDERS_ACTION_TYPES.SET_DESCENDING,
  payload: descending,
});

export const setRemainders = (
  loadMore: boolean,
  remainders: Remainders,
): SetRemaindersAction => ({
  type: REMAINDERS_ACTION_TYPES.SET_REMAINDERS,
  loadMore,
  payload: remainders,
});

export const clearRemainders = (): ClearRemaindersAction => ({
  type: REMAINDERS_ACTION_TYPES.CLEAR_REMAINDERS,
});

export const getRemainders =
  (
    loadMore: boolean,
    gtochkaid: number,
    page: number,
    descending: boolean,
    cnt: string = '',
    filter: string = '',
  ): ThunkAction<Promise<void>, RootState, unknown, RemaindersActions> =>
  async dispatch =>
    await new Promise((resolve, reject) => {
      if (!loadMore) dispatch(setLoading(true));
      api.remainders
        .getRemainders(gtochkaid, page, descending, cnt, filter)
        .then(res => {
          dispatch(setLoading(false));
          dispatch(setRemainders(loadMore, res.data));
          resolve();
        })
        .catch(e => {
          dispatch(handleError(e.response));
          dispatch(setLoading(false));
          reject(e);
        });
    });
