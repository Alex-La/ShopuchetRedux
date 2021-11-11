import {DateRange, SetDateAction} from '../../../utils';
import {Sales, Sklad} from '../../../utils/api.types';

export type Tab<T> = {
  loading: boolean;
  data: T;
};

export type Tabs = {
  sales: Tab<Sales>;
  income: Tab<Sklad>;
  return: Tab<Sklad>;
};

export type Trade = {
  index: number;
  date: DateRange;
  tabs: Tabs;
};

export enum TAB_TYPES {
  SALES = 'sales',
  INCOME = 'income',
  RETURN = 'return',
}

export enum TRADE_ACTION_TYPES {
  SET_LOADING = 'TRADE_ACTION/SET_LOADING',
  SET_DATE = 'TRADE_ACTION/SET_DATE',
  SET_SALES = 'TRADE_ACTION/SET_SALES',
  SET_INCOME = 'TRADE_ACTION/SET_INCOME',
  SET_RETURN = 'TRADE_ACTION/SET_RETURN',
}

export type SetLoadingAction = {
  type: string;
  payload: boolean;
  tab: TAB_TYPES;
};

export type SetSalesAction = {
  type: string;
  payload: Sales;
};

export type SetIncomeAction = {
  type: string;
  loadMore: boolean;
  payload: Sklad;
};

export type SetReturnAction = {
  type: string;
  loadMore: boolean;
  payload: Sklad;
};

export type TradeActions =
  | SetDateAction
  | SetSalesAction
  | SetIncomeAction
  | SetReturnAction
  | SetLoadingAction;
