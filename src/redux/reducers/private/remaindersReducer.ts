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
      const setRemaindersAction = action as SetRemaindersAction;
      return {
        ...state,
        remainders: setRemaindersAction.loadMore
          ? [...state.remainders, ...setRemaindersAction.payload]
          : setRemaindersAction.payload,
      };
    case REMAINDERS_ACTION_TYPES.CLEAR_REMAINDERS:
      return {...state, remainders: []};
    case REMAINDERS_ACTION_TYPES.SORT_REMAINDERS:
      return {
        loading: state.loading,
        remainders: state.remainders.reverse(),
        reverse: (action as SortRemaindersAction).payload,
      };
    default:
      return state;
  }
};
