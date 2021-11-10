import {DateRange, SetDateAction} from '../../../utils';
import {Sales, Sklad} from '../../../utils/api.types';

export type Trade = {
  index: number;
  date: DateRange;
  loading: boolean;
  sales: Sales;
  sklad: Sklad;
};

export enum TRADE_ACTION_TYPES {
  SET_LOADING = 'TRADE_ACTION/SET_LOADING',
  SET_DATE = 'TRADE_ACTION/SET_DATE',
  SET_SALES = 'TRADE_ACTION/SET_SALES',
  SET_SKLAD = 'TRADE_ACTION/SET_SKLAD',
}

export type SetLoadingAction = {
  type: string;
  payload: boolean;
};

export type SetSalesAction = {
  type: string;
  payload: Sales;
};

export type SetSkladAction = {
  type: string;
  loadMore: boolean;
  payload: Sklad;
};

export type TradeActions =
  | SetDateAction
  | SetSalesAction
  | SetSkladAction
  | SetLoadingAction;
