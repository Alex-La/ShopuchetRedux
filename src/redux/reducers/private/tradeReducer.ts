import {getDayRange} from '../../../utils';
import {
  Trade,
  TradeActions,
  TRADE_ACTION_TYPES,
} from '../../types/private/trade.types';

export const initialState: Trade = {
  index: 0,
  date: getDayRange(),
};

export const trade = (
  state: Trade = initialState,
  action: TradeActions,
): Trade => {
  switch (action.type) {
    case TRADE_ACTION_TYPES.SET_DATE:
      return {...state, ...action};
    default:
      return state;
  }
};
