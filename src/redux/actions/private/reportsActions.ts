import {DateRange, SetDateAction} from '../../../utils';
import {REPORTS_ACTION_TYPES} from '../../types/private/reports.types';

export const setDate = (index: number, date: DateRange): SetDateAction => ({
  type: REPORTS_ACTION_TYPES.SET_DATE,
  index,
  date,
});
