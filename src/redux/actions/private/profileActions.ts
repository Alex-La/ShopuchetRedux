import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api';
import {RootState} from '../../store';
import {SetAppLoadingAction} from '../../types/fetch.types';
import {GetUserAction} from '../../types/private/private.types';
import {PROFILE_ACTION_TYPES} from '../../types/private/profile.types';
import {onError} from '../fetchActions';
import {getUser} from './privateActions';

const setUpdateLoading = (loading: boolean): SetAppLoadingAction => ({
  type: PROFILE_ACTION_TYPES.SET_UPDATE_LOADING,
  payload: loading,
});

export const updateUser =
  (
    fn: string,
    nm: string,
    phone: string,
    oldpwd: string,
    newpwd: string,
    login: string,
  ): ThunkAction<
    Promise<string>,
    RootState,
    unknown,
    SetAppLoadingAction | GetUserAction
  > =>
  async dispatch => {
    dispatch(setUpdateLoading(true));
    return await new Promise(resolve =>
      api
        .updateUser(fn, nm, '', phone, oldpwd, newpwd)
        .then(res => {
          if (res.status === 200) {
            dispatch(getUser({fn, nm, phone, login, ft: ''}));
            resolve(res.data);
            dispatch(setUpdateLoading(false));
          }
        })
        .catch(e => onError(e.response.status, e.response.data)),
    );
  };
