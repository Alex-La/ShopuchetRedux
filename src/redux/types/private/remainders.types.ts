import {Remainder} from '../../../utils/api.types';

export type Remainders = {
  loading: boolean;
  remainders: Remainder[];
  reverse: boolean;
};

export enum REMAINDERS_ACTION_TYPES {
  SET_LOADING = 'REMAINDERS_ACTION/SET_LOADING',
  SET_REMAINDERS = 'REMAINDERS_ACTION/SET_REMAINDERS',
  SORT_REMAINDERS = 'REMAINDERS_ACTION/SORT_REMAINDERS',
}

export type SetLoadingAction = {
  type: string;
  payload: boolean;
};

export type SetRemaindersAction = {
  type: string;
  payload: Remainder[];
};

export type SortRemaindersAction = {
  type: string;
  payload: boolean;
};

export type RemaindersActions =
  | SetLoadingAction
  | SetRemaindersAction
  | SortRemaindersAction;
