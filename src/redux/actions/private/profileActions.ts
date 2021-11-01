import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api';
import {RootState} from '../../store';
import {SetUserAction} from '../../types/auth.types';
import {SetLoadingAction} from '../../types/fetch.types';
import {setUser} from '../authActions';
import {handleError, setLoading} from '../fetchActions';

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
    SetLoadingAction | SetUserAction
  > =>
  async dispatch => {
    dispatch(setLoading(true));
    return await new Promise(resolve =>
      api
        .updateUser(fn, nm, '', phone, oldpwd, newpwd)
        .then(res => {
          if (res.status === 200) {
            dispatch(setUser({fn, nm, phone, login, ft: ''}));
            resolve(res.data);
            dispatch(setLoading(false));
          }
        })
        .catch(e => {
          dispatch(setLoading(false));
          dispatch(handleError(e.response));
        }),
    );
  };
