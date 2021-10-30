import {TradePoint, TradePoints, User} from '../../../utils/api.types';

export type Private = {
  tradePoints: TradePoints;
  tradePoint?: TradePoint;
  user: User;
};

export enum PRIVATE_ACTION_TYPES {
  GET_TRADE_POINTS = 'PRIVATE_ACTION/GET_TRADE_POINTS',
  SET_TRADE_POINT = 'PRIVATE_ACTION/SET_TRADE_POINT',
  GET_USER = 'PRIVATE_ACTION/GET_USER',
}

export type GetTradePointsAction = {
  type: string;
  payload: TradePoints;
};

export type SetTradePointAction = {
  type: string;
  payload: TradePoint;
};

export type GetUserAction = {
  type: string;
  payload: User;
};

export type PrivateActions =
  | GetTradePointsAction
  | SetTradePointAction
  | GetUserAction;
