import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api';
import {MainData, TradePoint, TradePoints} from '../../../utils/api.types';
import {RootState} from '../../store';
import {SetAppLoadingAction} from '../../types/fetch.types';
import {
  SetMainDataAction,
  MAIN_ACTION_TYPES,
  SetTradePointsAction,
  SetTradePointAction,
  SetLoadingAction,
} from '../../types/private/main.types';
import {handleError, setAppLoading} from '../fetchActions';

const setLoading = (loading: boolean): SetLoadingAction => ({
  type: MAIN_ACTION_TYPES.SET_LOADING,
  payload: loading,
});

const setTradePoints = (tradePoints: TradePoints): SetTradePointsAction => ({
  type: MAIN_ACTION_TYPES.SET_TRADE_POINTS,
  payload: tradePoints,
});

export const setTradePoint = (
  tradePoint: TradePoint | undefined,
): SetTradePointAction => ({
  type: MAIN_ACTION_TYPES.SET_TRADE_POINT,
  payload: tradePoint,
});

const setMainData = (data: MainData): SetMainDataAction => ({
  type: MAIN_ACTION_TYPES.SET_MAIN_DATA,
  payload: data,
});

export const getTradePoints =
  (): ThunkAction<
    void,
    RootState,
    unknown,
    SetAppLoadingAction | SetTradePointsAction | SetTradePointAction
  > =>
  dispatch => {
    dispatch(setAppLoading(true));
    api
      .getTradePoints()
      .then(res => {
        dispatch(setTradePoints(res.data));
        dispatch(setTradePoint(res.data[0] || null));
        dispatch(setAppLoading(false));
      })
      .catch(e => {
        dispatch(setAppLoading(false));
        dispatch(handleError(e.response));
      });
  };

export const getMainData =
  (
    gtochkaid: number,
  ): ThunkAction<
    void,
    RootState,
    unknown,
    SetMainDataAction | SetLoadingAction
  > =>
  dispatch => {
    dispatch(setLoading(true));
    api
      .getMain(gtochkaid)
      .then(res => {
        dispatch(setMainData(res.data));
        dispatch(setLoading(false));
      })
      .catch(e => {
        dispatch(setLoading(false));
        dispatch(handleError(e.response));
      });
  };
