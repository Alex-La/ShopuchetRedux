import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api/api';
import {Friend} from '../../../utils/api.types';
import {RootState} from '../../store';
import {
  FRIENDS_ACTION_TYPES,
  GetFriendsAction,
  SetLoadingAction,
} from '../../types/private/friends.types';
import {handleError} from '../fetchActions';

const setLoading = (loading: boolean): SetLoadingAction => ({
  type: FRIENDS_ACTION_TYPES.SET_LOADING,
  payload: loading,
});

const getFriends = (friends: Friend[]): GetFriendsAction => ({
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
    api.friends
      .getFriends()
      .then(res => {
        dispatch(getFriends(res.data));
        dispatch(setLoading(false));
      })
      .catch(e => {
        dispatch(setLoading(false));
        dispatch(handleError(e.response));
      });
  };

export const linkUser =
  (
    login: string,
    gtochkaids: string,
  ): ThunkAction<Promise<string>, RootState, unknown, SetLoadingAction> =>
  async dispatch => {
    dispatch(setLoading(true));
    return await new Promise(resolve =>
      api.friends
        .linkUser(login, gtochkaids)
        .then(res => {
          dispatch(loadFriends());
          resolve(res.data);
        })
        .catch(e => {
          dispatch(handleError(e.response));
          dispatch(setLoading(false));
        }),
    );
  };
