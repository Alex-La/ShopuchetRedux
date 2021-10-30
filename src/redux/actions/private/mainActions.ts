import {ThunkAction} from 'redux-thunk';
import {RootState} from '../../store';
import {GetMainDataAction} from '../../types/private/main.types';

export const getMainData = (): ThunkAction<
  void,
  RootState,
  unknown,
  GetMainDataAction
> => {};
