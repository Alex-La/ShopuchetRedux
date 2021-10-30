import {TradePoint, TradePoints, User} from '../../../utils/api.types';
import {
  Private,
  PrivateActions,
  PRIVATE_ACTION_TYPES,
} from '../../types/private/private.types';

const initialTradePoint: TradePoint = {
  gTochkaId: 0,
  usersId: 0,
  recId: 0,
  name: '',
};

const initialUser: User = {
  login: '',
  fn: '',
  ft: '',
  nm: '',
  phone: 'Не указан',
};

const initialState: Private = {
  tradePoints: [],
  tradePoint: initialTradePoint,
  user: initialUser,
};

export const privateState = (
  state: Private = initialState,
  action: PrivateActions,
): Private => {
  switch (action.type) {
    case PRIVATE_ACTION_TYPES.GET_TRADE_POINTS:
      return {...state, tradePoints: action.payload as TradePoints};
    case PRIVATE_ACTION_TYPES.SET_TRADE_POINT:
      return {...state, tradePoint: action.payload as TradePoint};
    case PRIVATE_ACTION_TYPES.GET_USER:
      return {...state, user: action.payload as User};
    default:
      return state;
  }
};
