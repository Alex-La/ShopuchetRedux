type AppLoading = boolean;
type Loading = boolean;

export type Fetch = {
  appLoading: AppLoading;
  loading: Loading;
};

export enum FETCH_ACTION_TYPES {
  SET_APP_LOADING = 'FETCH_ACTION/APP_LOADING',
  SET_LOADING = 'FETCH_ACTION/LOADING',
}

export type SetAppLoading = {
  type: string;
  payload: AppLoading;
};

export type SetLoading = {
  type: string;
  payload: Loading;
};

export type FetchActions = SetAppLoading | SetLoading;
