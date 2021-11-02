import {Friend} from '../../../utils/api.types';

export type Friends = {
  loading: boolean;
  friends: Friend[];
};

export enum FRIENDS_ACTION_TYPES {
  SET_LOADING = 'FRIENDS_ACTION/SET_LOADING',
  GET_FRIENDS = 'FRIENDS_ACTION/GET_FRIENDS',
}

export type SetLoadingAction = {
  type: string;
  payload: boolean;
};

export type GetFriendsAction = {
  type: string;
  payload: Friend[];
};

export type FriendsActions = SetLoadingAction | GetFriendsAction;
