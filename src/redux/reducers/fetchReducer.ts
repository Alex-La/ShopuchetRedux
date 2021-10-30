import {Fetch, FetchActions, FETCH_ACTION_TYPES} from '../types/fetch.types';

const initialState: Fetch = {appLoading: false, loading: false};

export const fetch = (
  state: Fetch = initialState,
  action: FetchActions,
): Fetch => {
  switch (action.type) {
    case FETCH_ACTION_TYPES.SET_APP_LOADING:
      return {...state, appLoading: action.payload};
    case FETCH_ACTION_TYPES.SET_LOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
};
