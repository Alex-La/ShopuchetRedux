import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api';
import {Remainder} from '../../../utils/api.types';
import {RootState} from '../../store';
import {SetLoadingAction} from '../../types/fetch.types';
import {
  REMAINDERS_ACTION_TYPES,
  SetRemaindersAction,
  SortRemaindersAction,
} from '../../types/private/remainders.types';
import {handleError, setLoading} from '../fetchActions';

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
    cnt: number,
    filter: string,
  ): ThunkAction<
    void,
    RootState,
    unknown,
    SetRemaindersAction | SetLoadingAction
  > =>
  dispatch => {
    dispatch(setLoading(true));
    api
      .getRemainders(gtochkaid, cnt, filter)
      .then(res => {
        dispatch(setRemainders(res.data));
        dispatch(setLoading(false));
      })
      .catch(e => {
        dispatch(setLoading(false));
        dispatch(handleError(e.response));
      });
  };
