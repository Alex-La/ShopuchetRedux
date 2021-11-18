import {
  Friends,
  FriendsActions,
  FRIENDS_ACTION_TYPES,
  GetFriendsAction,
  SetLoadingAction,
  SetRefreshingAction,
} from '../../types/private/friends.types';

export const initialState: Friends = {
  loading: true,
  refreshing: false,
  friends: [],
};

export const friends = (
  state: Friends = initialState,
  action: FriendsActions,
): Friends => {
  switch (action.type) {
    case FRIENDS_ACTION_TYPES.SET_LOADING:
      return {...state, loading: (action as SetLoadingAction).payload};
    case FRIENDS_ACTION_TYPES.SET_REFRESHING:
      return {...state, refreshing: (action as SetRefreshingAction).payload};
    case FRIENDS_ACTION_TYPES.GET_FRIENDS:
      return {...state, friends: (action as GetFriendsAction).payload};
    default:
      return state;
  }
};
