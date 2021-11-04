import {getDayRange} from '../../../utils';
import {
  Reports,
  ReportsActions,
  REPORTS_ACTION_TYPES,
  Tabs,
} from '../../types/private/reports.types';

const initialTabs: Tabs = {
  salesGroups: {
    head: {cnt: 0, summ: 0, income: 0},
    details: [],
  },
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
    default:
      return state;
  }
};
