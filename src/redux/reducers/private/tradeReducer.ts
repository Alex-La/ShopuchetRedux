import {getDayRange, SetDateAction} from '../../../utils';
import {Sale, Sklad} from '../../../utils/api.types';
import {SetLoadingAction} from '../../types/auth.types';
import {
  SetSalesAction,
  SetSkladAction,
  Trade,
  TradeActions,
  TRADE_ACTION_TYPES,
} from '../../types/private/trade.types';

const initialSale: Sale = {
  cnt: 0,
  income: 0,
  summ: 0,
};

const initialSklad: Sklad = {
  currentPage: 0,
  hasNext: false,
  hasPrevious: false,
  totalPages: 0,
  details: [],
};

export const initialState: Trade = {
  index: 0,
  loading: false,
  date: getDayRange(),
  sales: {
    sales: initialSale,
    details: [],
  },
  sklad: initialSklad,
};

export const trade = (
  state: Trade = initialState,
  action: TradeActions,
): Trade => {
  switch (action.type) {
    case TRADE_ACTION_TYPES.SET_LOADING:
      const loadingAction = action as SetLoadingAction;
      return {...state, loading: loadingAction.payload};
    case TRADE_ACTION_TYPES.SET_DATE:
      const dateAction = action as SetDateAction;
      return {...state, ...dateAction};
    case TRADE_ACTION_TYPES.SET_SALES:
      const salesAction = action as SetSalesAction;
      return {...state, sales: salesAction.payload};
    case TRADE_ACTION_TYPES.SET_SKLAD:
      const skladAction = action as SetSkladAction;
      if (skladAction.loadMore)
        return {
          ...state,
          sklad: {
            ...state.sklad,
            details: [...state.sklad.details, ...skladAction.payload.details],
          },
        };
      return {...state, sklad: skladAction.payload};
    default:
      return state;
  }
};
