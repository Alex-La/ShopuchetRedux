import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api';
import {MainData} from '../../../utils/api.types';
import {RootState} from '../../store';
import {SetLoadingAction} from '../../types/fetch.types';
import {
  GetMainDataAction,
  MAIN_ACTION_TYPES,
} from '../../types/private/main.types';
import {onError, setLoading} from '../fetchActions';

const dispatchMainData = (data: MainData): GetMainDataAction => ({
  type: MAIN_ACTION_TYPES.GET_MAIN_DATA,
  payload: data,
});

export const getMainData =
  (
    gtochkaid: number,
  ): ThunkAction<
    void,
    RootState,
    unknown,
    GetMainDataAction | SetLoadingAction
  > =>
  dispatch => {
    dispatch(setLoading(true));
    api
      .getMain(gtochkaid)
      .then(res => {
        dispatch(dispatchMainData(res.data));
        dispatch(setLoading(false));
      })
      .catch(e => onError(e.response.status, e.response.data));
  };
