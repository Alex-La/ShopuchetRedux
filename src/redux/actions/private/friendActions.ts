import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api';
import {RootState} from '../../store';
import {SetLoadingAction} from '../../types/fetch.types';
import {
  Friends,
  FRIENDS_ACTION_TYPES,
  GetFriendsAction,
} from '../../types/private/friends.types';
import {handleError, setLoading} from '../fetchActions';

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
      api
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
