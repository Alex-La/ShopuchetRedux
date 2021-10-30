import {MainData, MainDataObject} from '../../../utils/api.types';
import {
  Main,
  MainActions,
  MAIN_ACTION_TYPES,
} from '../../types/private/main.types';

const mainDataObject: MainDataObject = {
  avg: 0,
  cnt: 0,
  income: 0,
  summ: 0,
};

const initialMainData: MainData = {
  summ: 0,
  day: mainDataObject,
  week: mainDataObject,
  month: mainDataObject,
};

const initialState: Main = {
  mainData: initialMainData,
};

export const main = (state: Main = initialState, action: MainActions): Main => {
  switch (action.type) {
    case MAIN_ACTION_TYPES.GET_MAIN_DATA:
      return {mainData: action.payload};
    default:
      return state;
  }
};
