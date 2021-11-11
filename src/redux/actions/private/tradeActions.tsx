import {ThunkAction} from 'redux-thunk';
import {DateRange, SetDateAction} from '../../../utils';
import {Sales} from '../../../utils/api.types';
import api from '../../../utils/api/api';
import {RootState} from '../../store';
import {
  SetLoadingAction,
  SetSalesAction,
  SetTradeSessionAction,
  TAB_TYPES,
  TradeActions,
  TradeSession,
  TRADE_ACTION_TYPES,
} from '../../types/private/trade.types';
import {handleError} from '../fetchActions';

export const setDate = (index: number, date: DateRange): SetDateAction => ({
  type: TRADE_ACTION_TYPES.SET_DATE,
  index,
  date,
});

export const setLoading = (
  loading: boolean,
  tab: TAB_TYPES,
): SetLoadingAction => ({
  type: TRADE_ACTION_TYPES.SET_LOADING,
  payload: loading,
  tab,
});

export const setTradeSession = (
  tradeSession: TradeSession,
): SetTradeSessionAction => ({
  type: TRADE_ACTION_TYPES.SET_TRADE_SESSION,
  payload: tradeSession,
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
    dispatch(setLoading(true, TAB_TYPES.SALES));
    api.trade
      .getSales(gtochkaid, datebegin, dateend)
      .then(res => {
        dispatch(setSales(res.data));
        dispatch(setLoading(false, TAB_TYPES.SALES));
      })
      .catch(e => {
        dispatch(setLoading(false, TAB_TYPES.SALES));
        dispatch(handleError(e.response));
      });
  };

export const deleteSale =
  (
    deleteId: number,
  ): ThunkAction<Promise<string>, RootState, any, TradeActions> =>
  async dispatch => {
    dispatch(setLoading(true, TAB_TYPES.SALES));
    return await new Promise((resolve, reject) =>
      api.trade
        .deleteSale([deleteId])
        .then(res => {
          let str: string = '';
          for (let [_, value] of Object.entries(res.data)) str = value;
          setLoading(false, TAB_TYPES.SALES);
          resolve(str);
        })
        .catch(e => {
          dispatch(setLoading(false, TAB_TYPES.SALES));
          dispatch(handleError(e.response));
          reject(e);
        }),
    );
  };

export const deleteReceipt =
  (
    deleteId: number,
    tab: TAB_TYPES,
  ): ThunkAction<Promise<string>, RootState, any, TradeActions> =>
  async dispatch => {
    dispatch(setLoading(true, tab));
    return await new Promise((resolve, reject) =>
      api.trade
        .deleteReceipt([deleteId])
        .then(res => {
          let str: string = '';
          for (let [_, value] of Object.entries(res.data)) str = value;
          setLoading(false, tab);
          resolve(str);
        })
        .catch(e => {
          dispatch(setLoading(false, tab));
          dispatch(handleError(e.response));
          reject(e);
        }),
    );
  };
