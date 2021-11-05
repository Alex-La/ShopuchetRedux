import {getDayRange} from '../../../utils';
import {
  Reports,
  ReportsActions,
  REPORTS_ACTION_TYPES,
  SetLoadingAction,
  SetReduceAction,
  SetSalesGroupsAction,
  SetSalesMonthAction,
  SetSalesProductsAction,
  Tabs,
} from '../../types/private/reports.types';

const salesObject = {
  loading: false,
  reduce: false,
  data: {
    head: {cnt: 0, summ: 0, income: 0},
    details: [],
  },
};

const initialTabs: Tabs = {
  salesGroups: salesObject,
  salesProducts: salesObject,
  salesMonth: salesObject,
};

export const initialState: Reports = {
  index: 0,
  date: getDayRange(),
  tabs: initialTabs,
};

export const reports = (
  state: Reports = initialState,
  action: ReportsActions,
): Reports => {
  switch (action.type) {
    case REPORTS_ACTION_TYPES.SET_DATE:
      return {...state, ...action};
    case REPORTS_ACTION_TYPES.SET_LOADING:
      const loadingAction = action as SetLoadingAction;
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [loadingAction.tab]: {
            ...state.tabs[loadingAction.tab],
            loading: loadingAction.payload,
          },
        },
      };
    case REPORTS_ACTION_TYPES.SET_REDUCE:
      const reduceAction = action as SetReduceAction;
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [reduceAction.tab]: {
            ...state.tabs[reduceAction.tab],
            reduce: reduceAction.payload,
          },
        },
      };
    case REPORTS_ACTION_TYPES.SET_SALES_GROUPS:
      return {
        ...state,
        tabs: {
          ...state.tabs,
          salesGroups: {
            ...state.tabs.salesGroups,
            data: (action as SetSalesGroupsAction).payload,
          },
        },
      };
    case REPORTS_ACTION_TYPES.SET_SALES_PRODUCTS:
      return {
        ...state,
        tabs: {
          ...state.tabs,
          salesProducts: {
            ...state.tabs.salesProducts,
            data: (action as SetSalesProductsAction).payload,
          },
        },
      };
    case REPORTS_ACTION_TYPES.SET_SALES_MONTH:
      return {
        ...state,
        tabs: {
          ...state.tabs,
          salesMonth: {
            ...state.tabs.salesMonth,
            data: (action as SetSalesMonthAction).payload,
          },
        },
      };
    default:
      return state;
  }
};
