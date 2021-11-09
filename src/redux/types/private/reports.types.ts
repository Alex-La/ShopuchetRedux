import {DateRange, SetDateAction} from '../../../utils';
import {
  SalesGroups,
  SalesMonth,
  SalesProducts,
  ReturnsProducts,
} from '../../../utils/api.types';

export type Tab<T> = {
  reduce: boolean;
  loading: boolean;
  data: T;
};

export type Tabs = {
  salesGroups: Tab<SalesGroups>;
  salesProducts: Tab<SalesProducts>;
  salesMonth: Tab<SalesMonth>;
  returnsByProducts: Tab<ReturnsProducts>;
};

export type Reports = {
  index: number;
  date: DateRange;
  tabs: Tabs;
};

export enum TAB_TYPES {
  SALES_GROUPS = 'salesGroups',
  SALES_PRODUCTS = 'salesProducts',
  SALES_MONTH = 'salesMonth',
  RETURNS_PRODUCTS = 'returnsByProducts',
}

export enum REPORTS_ACTION_TYPES {
  SET_DATE = 'REPORTS_ACTION/SET_DATE',
  SET_LOADING = 'REPORTS_ACTION/SET_LOADING',
  SET_REDUCE = 'REPORTS_ACTION/SET_REDUCE',
  SET_SALES_GROUPS = 'REPORTS_ACTION/SET_SALES_GROUPS',
  SET_SALES_PRODUCTS = 'REPORTS_ACTION/SET_SALES_PRODUCTS',
  SET_SALES_MONTH = 'REPORTS_ACTION/SET_SALES_MONTH',
  SET_RETURNS_PRODUCTS = 'REPORTS_ACTION/SET_RETURNS_PRODUCTS',
}

export type SetLoadingAction = {
  type: string;
  payload: boolean;
  tab: TAB_TYPES;
};

export type SetReduceAction = {
  type: string;
  payload: boolean;
  tab: TAB_TYPES;
};

export type SetSalesGroupsAction = {
  type: string;
  payload: SalesGroups;
};

export type SetSalesProductsAction = {
  type: string;
  payload: SalesProducts;
};

export type SetSalesMonthAction = {
  type: string;
  payload: SalesMonth;
};

export type SetReturnsProductsAction = {
  type: string;
  loadMore: boolean;
  payload: ReturnsProducts;
};

export type ReportsActions =
  | SetDateAction
  | SetLoadingAction
  | SetReduceAction
  | SetSalesGroupsAction
  | SetSalesProductsAction
  | SetSalesMonthAction
  | SetReturnsProductsAction;
