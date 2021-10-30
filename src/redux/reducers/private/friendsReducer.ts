import {
  Friends,
  FriendsActions,
  FRIENDS_ACTION_TYPES,
} from '../../types/private/friends.types';

const initialState: Friends = [];

export const friends = (
  state: Friends = initialState,
  action: FriendsActions,
): Friends => {
  switch (action.type) {
    case FRIENDS_ACTION_TYPES.GET_FRIENDS:
      return action.payload;
    default:
      return state;
  }
};
