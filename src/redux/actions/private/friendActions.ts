import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api';
import {RootState} from '../../store';
import {SetLoadingAction} from '../../types/fetch.types';
import {
  Friends,
  FRIENDS_ACTION_TYPES,
  GetFriendsAction,
} from '../../types/private/friends.types';
import {onError, setLoading} from '../fetchActions';

const getFriends = (friends: Friends): GetFriendsAction => ({
  type: FRIENDS_ACTION_TYPES.GET_FRIENDS,
  payload: friends,
});

export const loadFriends =
  (): ThunkAction<
    void,
    RootState,
    unknown,
    GetFriendsAction | SetLoadingAction
  > =>
  dispatch => {
    dispatch(setLoading(true));
    api
      .getFriends()
      .then(res => {
        dispatch(getFriends(res.data));
        dispatch(setLoading(false));
      })
      .catch(e => {
        dispatch(setLoading(false));
        dispatch(onError(e.response.status, e.response.data));
      });
  };
