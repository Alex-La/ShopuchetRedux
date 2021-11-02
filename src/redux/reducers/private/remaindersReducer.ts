import {
  Remainders,
  RemaindersActions,
  REMAINDERS_ACTION_TYPES,
  SetLoadingAction,
  SetRemaindersAction,
  SortRemaindersAction,
} from '../../types/private/remainders.types';

export const initialState: Remainders = {
  loading: false,
  remainders: [],
  reverse: false,
};

export const remainders = (
  state: Remainders = initialState,
  action: RemaindersActions,
): Remainders => {
  switch (action.type) {
    case REMAINDERS_ACTION_TYPES.SET_LOADING:
      return {...state, loading: (action as SetLoadingAction).payload};
    case REMAINDERS_ACTION_TYPES.SET_REMAINDERS:
      return {...state, remainders: (action as SetRemaindersAction).payload};
    case REMAINDERS_ACTION_TYPES.SORT_REMAINDERS:
      console.log(action.payload);
      return {
        loading: state.loading,
        remainders: state.remainders.reverse(),
        reverse: (action as SortRemaindersAction).payload,
      };
    default:
      return state;
  }
};
