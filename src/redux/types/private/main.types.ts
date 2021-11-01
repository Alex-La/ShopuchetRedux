import {MainData, TradePoint, TradePoints} from '../../../utils/api.types';

export type Main = {
  tradePoints: TradePoints;
  tradePoint: TradePoint | undefined;
  mainData: MainData;
};

export enum MAIN_ACTION_TYPES {
  SET_TRADE_POINTS = 'MAIN_ACTION/SET_TRADE_POINTS',
  SET_TRADE_POINT = 'MAIN_ACTION/SET_TRADE_POINT',
  SET_MAIN_DATA = 'MAIN_ACTION/SET_MAIN_DATA',
}

export type SetTradePointsAction = {
  type: string;
  payload: TradePoints;
};

export type SetTradePointAction = {
  type: string;
  payload: TradePoint | undefined;
};

export type SetMainDataAction = {
  type: string;
  payload: MainData;
};

export type MainActions =
  | SetTradePointsAction
  | SetTradePointAction
  | SetMainDataAction;
