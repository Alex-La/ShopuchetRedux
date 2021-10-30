export type UpdateLoading = boolean;

export type Profile = {
  updateLoading: UpdateLoading;
};

export enum PROFILE_ACTION_TYPES {
  SET_UPDATE_LOADING = 'PROFILE_ACTION/SET_UPDATE_LOADING',
}

export type SetUpdateLoadingAction = {
  type: string;
  payload: UpdateLoading;
};

export type ProfileActions = SetUpdateLoadingAction;
