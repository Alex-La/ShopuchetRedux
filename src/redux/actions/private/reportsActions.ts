import {ThunkAction} from 'redux-thunk';
import {DateRange, SetDateAction} from '../../../utils';
import {
  ReturnsProducts,
  SalesGroups,
  SalesMonth,
  SalesProducts,
} from '../../../utils/api.types';
import api from '../../../utils/api/api';
import {RootState} from '../../store';
import {
  ReportsActions,
  REPORTS_ACTION_TYPES,
  SetLoadingAction,
  SetReduceAction,
  SetReturnsProductsAction,
  SetSalesGroupsAction,
  SetSalesMonthAction,
  SetSalesProductsAction,
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
): SetLoadingAction => {
  return {
    type: REPORTS_ACTION_TYPES.SET_LOADING,
    payload: loading,
    tab,
  };
};

export const setReduce = (
  reduce: boolean,
  tab: TAB_TYPES,
): SetReduceAction => ({
  type: REPORTS_ACTION_TYPES.SET_REDUCE,
  payload: reduce,
  tab,
});

export const setSalesProducts = (
  salesProducts: SalesProducts,
): SetSalesProductsAction => ({
  type: REPORTS_ACTION_TYPES.SET_SALES_PRODUCTS,
  payload: salesProducts,
});

export const setSalesGroups = (
  salesGroups: SalesGroups,
): SetSalesGroupsAction => ({
  type: REPORTS_ACTION_TYPES.SET_SALES_GROUPS,
  payload: salesGroups,
});

export const setSalesMonth = (salesMonth: SalesMonth): SetSalesMonthAction => ({
  type: REPORTS_ACTION_TYPES.SET_SALES_MONTH,
  payload: salesMonth,
});

export const setReturnsProducts = (
  loadMore: boolean,
  returnsProducts: ReturnsProducts,
): SetReturnsProductsAction => ({
  type: REPORTS_ACTION_TYPES.SET_RETURNS_PRODUCTS,
  loadMore,
  payload: returnsProducts,
});

export const getSalesProducts =
  (
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
  ): ThunkAction<void, RootState, unknown, ReportsActions> =>
  dispatch => {
    dispatch(setLoading(true, TAB_TYPES.SALES_PRODUCTS));
    api.reports
      .getSalesByProducts(gtochkaid, datebegin, dateend)
      .then(res => {
        dispatch(setSalesProducts(res.data));
        dispatch(setLoading(false, TAB_TYPES.SALES_PRODUCTS));
      })
      .catch(e => {
        dispatch(setLoading(false, TAB_TYPES.SALES_PRODUCTS));
        dispatch(handleError(e.response));
      });
  };

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

export const getSalesMonth =
  (
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
  ): ThunkAction<void, RootState, unknown, ReportsActions> =>
  dispatch => {
    dispatch(setLoading(true, TAB_TYPES.SALES_MONTH));
    api.reports
      .getSalesByMonth(gtochkaid, datebegin, dateend)
      .then(res => {
        dispatch(setSalesMonth(res.data));
        dispatch(setLoading(false, TAB_TYPES.SALES_MONTH));
      })
      .catch(e => {
        dispatch(setLoading(false, TAB_TYPES.SALES_MONTH));
        dispatch(handleError(e.response));
      });
  };

export const getReturnsProducts =
  (
    loadMore: boolean,
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
    page: number = 0,
    descending: boolean = true,
  ): ThunkAction<Promise<void>, RootState, unknown, ReportsActions> =>
  async dispatch => {
    if (!loadMore) dispatch(setLoading(true, TAB_TYPES.RETURNS_PRODUCTS));
    return await new Promise((resolve, reject) =>
      api.reports
        .getReturnsByProducts(gtochkaid, datebegin, dateend, page, descending)
        .then(res => {
          dispatch(setLoading(false, TAB_TYPES.RETURNS_PRODUCTS));
          dispatch(setReturnsProducts(loadMore, res.data));
          resolve();
        })
        .catch(e => {
          dispatch(handleError(e.response));
          dispatch(setLoading(false, TAB_TYPES.RETURNS_PRODUCTS));
          reject(e);
        }),
    );
  };
