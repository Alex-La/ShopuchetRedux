import {
  Friends,
  FriendsActions,
  FRIENDS_ACTION_TYPES,
  GetFriendsAction,
  SetLoadingAction,
} from '../../types/private/friends.types';

export const initialState: Friends = {loading: false, friends: []};

export const friends = (
  state: Friends = initialState,
  action: FriendsActions,
): Friends => {
  switch (action.type) {
    case FRIENDS_ACTION_TYPES.SET_LOADING:
      return {...state, loading: (action as SetLoadingAction).payload};
    case FRIENDS_ACTION_TYPES.GET_FRIENDS:
      return {...state, friends: (action as GetFriendsAction).payload};
    default:
      return state;
  }
};
