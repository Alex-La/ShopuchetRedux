import {ThunkAction} from 'redux-thunk';
import {DateRange, SetDateAction} from '../../../utils';
import {SalesGroups} from '../../../utils/api.types';
import api from '../../../utils/api/api';
import {RootState} from '../../store';
import {
  ReportsActions,
  REPORTS_ACTION_TYPES,
  SetLoadingAction,
  SetReduceAction,
  SetSalesGroupsAction,
  TAB_TYPES,
} from '../../types/private/reports.types';
import {handleError} from '../fetchActions';

export const setDate = (index: number, date: DateRange): SetDateAction => ({
  type: REPORTS_ACTION_TYPES.SET_DATE,
  index,
  date,
});

export const setLoading = (
  loading: boolean,
  tab: TAB_TYPES,
): SetLoadingAction => ({
  type: REPORTS_ACTION_TYPES.SET_LOADING,
  payload: loading,
  tab,
});

export const setReduce = (
  reduce: boolean,
  tab: TAB_TYPES,
): SetReduceAction => ({
  type: REPORTS_ACTION_TYPES.SET_REDUCE,
  payload: reduce,
  tab,
});

export const setSalesGroups = (
  salesGroups: SalesGroups,
): SetSalesGroupsAction => ({
  type: REPORTS_ACTION_TYPES.SET_SALES_GROUPS,
  payload: salesGroups,
});

export const getSalesGroups =
  (
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
  ): ThunkAction<void, RootState, unknown, ReportsActions> =>
  dispatch => {
    dispatch(setLoading(true, TAB_TYPES.SALES_GROUPS));
    api.reports
      .getSalesByGroups(gtochkaid, datebegin, dateend)
      .then(res => {
        dispatch(setSalesGroups(res.data));
        dispatch(setLoading(false, TAB_TYPES.SALES_GROUPS));
      })
      .catch(e => {
        dispatch(setLoading(false, TAB_TYPES.SALES_GROUPS));
        dispatch(handleError(e.response));
      });
  };
