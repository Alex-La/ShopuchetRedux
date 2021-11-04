import {DateRange, SetDateAction} from '../../../utils';
import {TRADE_ACTION_TYPES} from '../../types/private/trade.types';

export const setDate = (index: number, date: DateRange): SetDateAction => ({
  type: TRADE_ACTION_TYPES.SET_DATE,
  index,
  date,
});