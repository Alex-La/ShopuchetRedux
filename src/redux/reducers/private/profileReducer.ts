import {
  Profile,
  ProfileActions,
  PROFILE_ACTION_TYPES,
} from '../../types/private/profile.types';

const initialState: Profile = {updateLoading: false};

export const profile = (
  state: Profile = initialState,
  action: ProfileActions,
): Profile => {
  switch (action.type) {
    case PROFILE_ACTION_TYPES.SET_UPDATE_LOADING:
      return {updateLoading: action.payload};
    default:
      return state;
  }
};
