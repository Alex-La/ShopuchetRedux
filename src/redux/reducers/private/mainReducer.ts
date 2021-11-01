import {MainData, MainDataObject, TradePoint} from '../../../utils/api.types';
import {
  Main,
  MainActions,
  MAIN_ACTION_TYPES,
  SetMainDataAction,
  SetTradePointAction,
  SetTradePointsAction,
} from '../../types/private/main.types';

const initialTradePoint: TradePoint = {
  gTochkaId: 0,
  usersId: 0,
  recId: 0,
  name: '',
};

const mainDataObject: MainDataObject = {
  avg: 0,
  cnt: 0,
  income: 0,
  summ: 0,
};

const initialMainData: MainData = {
  summ: 0,
  day: mainDataObject,
  week: mainDataObject,
  month: mainDataObject,
};

const initialState: Main = {
  tradePoints: [],
  tradePoint: initialTradePoint,
  mainData: initialMainData,
};

export const main = (state: Main = initialState, action: MainActions): Main => {
  switch (action.type) {
    case MAIN_ACTION_TYPES.SET_TRADE_POINTS:
      return {...state, tradePoints: (action as SetTradePointsAction).payload};
    case MAIN_ACTION_TYPES.SET_TRADE_POINT:
      return {...state, tradePoint: (action as SetTradePointAction).payload};
    case MAIN_ACTION_TYPES.SET_MAIN_DATA:
      return {...state, mainData: (action as SetMainDataAction).payload};
    default:
      return state;
  }
};
