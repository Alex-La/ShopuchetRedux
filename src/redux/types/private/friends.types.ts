import {Friend} from '../../../utils/api.types';

export type Friends = Friend[];

export enum FRIENDS_ACTION_TYPES {
  GET_FRIENDS = 'FRIENDS_ACTION/GET_FRIENDS',
}

export type GetFriendsAction = {
  type: string;
  payload: Friends;
};

export type FriendsActions = GetFriendsAction;
