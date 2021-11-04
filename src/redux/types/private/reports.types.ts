import {DateRange, SetDateAction} from '../../../utils';
import {SalesGroups} from '../../../utils/api.types';

export type Tabs = {
  salesGroups: SalesGroups;
};

export type Reports = {
  index: number;
  date: DateRange;
  tabs: Tabs;
};

export enum REPORTS_ACTION_TYPES {
  SET_DATE = 'REPORTS_ACTION/SET_DATE',
}

export type ReportsActions = SetDateAction;
