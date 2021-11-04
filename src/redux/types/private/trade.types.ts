import {DateRange, SetDateAction} from '../../../utils';

export type Trade = {
  index: number;
  date: DateRange;
};

export enum TRADE_ACTION_TYPES {
  SET_DATE = 'TRADE_ACTION/SET_DATE',
}

export type TradeActions = SetDateAction;
