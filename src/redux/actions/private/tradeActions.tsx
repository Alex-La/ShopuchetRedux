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
