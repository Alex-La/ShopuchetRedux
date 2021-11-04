import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api';
import {ConReport} from '../../../utils/api.types';
import {RootState} from '../../store';
import {
  ConReportActions,
  CON_REPORT_ACTION_TYPES,
  SetConReportAction,
  SetLoadingAction,
} from '../../types/private/conReport.types';
import {handleError} from '../fetchActions';

const setLoading = (loading: boolean): SetLoadingAction => ({
  type: CON_REPORT_ACTION_TYPES.SET_LOADING,
  payload: loading,
});

const setConReport = (conReport: ConReport): SetConReportAction => ({
  type: CON_REPORT_ACTION_TYPES.SET_CON_REPORT,
  payload: conReport,
});

export const getConReport =
  (
    gtochkaid: number,
    datebegin: Date,
  ): ThunkAction<void, RootState, unknown, ConReportActions> =>
  dispatch => {
    dispatch(setLoading(true));
    api.conReport
      .getConReport(gtochkaid, datebegin)
      .then(res => {
        dispatch(setConReport(res.data));
        dispatch(setLoading(false));
      })
      .catch(e => {
        dispatch(handleError(e.response));
        dispatch(setLoading(false));
      });
  };
