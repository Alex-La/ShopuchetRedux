import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api';
import {TradePoint, TradePoints, User} from '../../../utils/api.types';
import {RootState} from '../../store';
import {SetAppLoadingAction} from '../../types/fetch.types';
import {
  GetTradePointsAction,
  GetUserAction,
  PrivateActions,
  PRIVATE_ACTION_TYPES,
  SetTradePointAction,
} from '../../types/private/private.types';
import {setIsAuth} from '../authActions';
import {onError, setAppLoading} from '../fetchActions';

const getTradePoints = (tradePoints: TradePoints): GetTradePointsAction => ({
  type: PRIVATE_ACTION_TYPES.GET_TRADE_POINTS,
  payload: tradePoints,
});

export const setTradePoint = (tradePoint: TradePoint): SetTradePointAction => ({
  type: PRIVATE_ACTION_TYPES.SET_TRADE_POINT,
  payload: tradePoint,
});

export const getUser = (user: User): GetUserAction => ({
  type: PRIVATE_ACTION_TYPES.GET_USER,
  payload: user,
});

export const getPrivateData =
  (): ThunkAction<
    void,
    RootState,
    unknown,
    SetAppLoadingAction | PrivateActions
  > =>
  dispatch => {
    dispatch(setAppLoading(true));
    api
      .getUser()
      .then(res => {
        dispatch(getUser(res.data));
        api
          .getTradePoints()
          .then(res => {
            dispatch(getTradePoints(res.data));
            dispatch(setTradePoint(res.data[0]));
            dispatch(setIsAuth(true));
            dispatch(setAppLoading(false));
          })
          .catch(e => {
            const {status, data} = e.response;
            dispatch(onError(status, data));
          });
      })
      .catch(e => {
        const {status, data} = e.response;
        dispatch(onError(status, data));
      });
  };
