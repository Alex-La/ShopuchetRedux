import {ThunkAction} from 'redux-thunk';
import {DateRange, SetDateAction} from '../../../utils';
import {Sales} from '../../../utils/api.types';
import api from '../../../utils/api/api';
import {RootState} from '../../store';
import {
  SetLoadingAction,
  SetSalesAction,
  TradeActions,
  TRADE_ACTION_TYPES,
} from '../../types/private/trade.types';
import {handleError} from '../fetchActions';

export const setDate = (index: number, date: DateRange): SetDateAction => ({
  type: TRADE_ACTION_TYPES.SET_DATE,
  index,
  date,
});

export const setLoading = (loading: boolean): SetLoadingAction => ({
  type: TRADE_ACTION_TYPES.SET_LOADING,
  payload: loading,
});

export const setSales = (sales: Sales): SetSalesAction => ({
  type: TRADE_ACTION_TYPES.SET_SALES,
  payload: sales,
});

export const getSales =
  (
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
  ): ThunkAction<any, RootState, unknown, TradeActions> =>
  dispatch => {
    dispatch(setLoading(true));
    api.trade
      .getSales(gtochkaid, datebegin, dateend)
      .then(res => {
        dispatch(setSales(res.data));
        dispatch(setLoading(false));
      })
      .catch(e => {
        dispatch(setLoading(false));
        dispatch(handleError(e.response));
      });
  };

export const deleteSale =
  (
    deleteId: number,
  ): ThunkAction<Promise<string>, RootState, any, TradeActions> =>
  async dispatch => {
    dispatch(setLoading(true));
    return await new Promise((resolve, reject) =>
      api.trade
        .deleteSale([deleteId])
        .then(res => {
          let str: string = '';
          for (let [_, value] of Object.entries(res.data)) str = value;
          setLoading(false);
          resolve(str);
        })
        .catch(e => {
          dispatch(setLoading(false));
          dispatch(handleError(e.response));
          reject(e);
        }),
    );
  };

export const deleteReceipt =
  (
    deleteId: number,
  ): ThunkAction<Promise<string>, RootState, any, TradeActions> =>
  async dispatch => {
    dispatch(setLoading(true));
    return await new Promise((resolve, reject) =>
      api.trade
        .deleteReceipt([deleteId])
        .then(res => {
          let str: string = '';
          for (let [_, value] of Object.entries(res.data)) str = value;
          setLoading(false);
          resolve(str);
        })
        .catch(e => {
          dispatch(setLoading(false));
          dispatch(handleError(e.response));
          reject(e);
        }),
    );
  };
