import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api';
import {RootState} from '../../store';
import {SetLoadingAction} from '../../types/fetch.types';
import {GetUserAction} from '../../types/private/private.types';
import {onError, setLoading} from '../fetchActions';
import {getUser} from './privateActions';

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
    SetLoadingAction | GetUserAction
  > =>
  async dispatch => {
    dispatch(setLoading(true));
    return await new Promise(resolve =>
      api
        .updateUser(fn, nm, '', phone, oldpwd, newpwd)
        .then(res => {
          if (res.status === 200) {
            dispatch(getUser({fn, nm, phone, login, ft: ''}));
            resolve(res.data);
            dispatch(setLoading(false));
          }
        })
        .catch(e => {
          dispatch(setLoading(false));
          dispatch(onError(e.response.status, e.response.data));
        }),
    );
  };
