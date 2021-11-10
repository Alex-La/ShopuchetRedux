import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api/api';
import {
  MainData,
  MainGraph,
  TradePoint,
  TradePoints,
} from '../../../utils/api.types';
import {RootState} from '../../store';
import {SetAppLoadingAction} from '../../types/fetch.types';
import {
  SetMainDataAction,
  MAIN_ACTION_TYPES,
  SetTradePointsAction,
  SetTradePointAction,
  SetLoadingAction,
  SetMainGraphAction,
  MainActions,
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

const setMainGrahp = (data: MainGraph[]): SetMainGraphAction => ({
  type: MAIN_ACTION_TYPES.SET_MAIN_GRAPH,
  payload: data,
});

export const getTradePoints =
  (): ThunkAction<void, RootState, unknown, MainActions> => dispatch => {
    dispatch(setAppLoading(true));
    api.main
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
  (gtochkaid: number): ThunkAction<void, RootState, unknown, MainActions> =>
  dispatch => {
    dispatch(setLoading(true));
    api.main
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

export const getMainGraph =
  (
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
  ): ThunkAction<any, RootState, unknown, MainActions> =>
  dispatch => {
    dispatch(setLoading(true));
    api.main
      .getMainGraph(gtochkaid, datebegin, dateend)
      .then(res => {
        dispatch(setMainGrahp(res.data));
        dispatch(setLoading(false));
      })
      .catch(e => {
        dispatch(setLoading(false));
        dispatch(handleError(e.response));
      });
  };
