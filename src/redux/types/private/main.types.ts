import {MainData} from '../../../utils/api.types';

export type Main = {
  mainData: MainData;
};

export enum MAIN_ACTION_TYPES {
  GET_MAIN_DATA = 'MAIN_ACTION/GET_MAIN_DATA',
}

export type GetMainDataAction = {
  type: string;
  payload: MainData;
};

export type MainActions = GetMainDataAction;
