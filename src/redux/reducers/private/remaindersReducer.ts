import {
  Remainders,
  RemaindersActions,
  REMAINDERS_ACTION_TYPES,
  SetRemaindersAction,
  SortRemaindersAction,
} from '../../types/private/remainders.types';

export const initialState: Remainders = {
  remainders: [],
  reverse: false,
};

export const remainders = (
  state: Remainders = initialState,
  action: RemaindersActions,
): Remainders => {
  switch (action.type) {
    case REMAINDERS_ACTION_TYPES.SET_REMAINDERS:
      return {...state, remainders: (action as SetRemaindersAction).payload};
    case REMAINDERS_ACTION_TYPES.SORT_REMAINDERS:
      console.log(action.payload);
      return {
        remainders: state.remainders.reverse(),
        reverse: (action as SortRemaindersAction).payload,
      };
    default:
      return state;
  }
};
