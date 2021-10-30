import {combineReducers} from 'redux';

import {auth} from './authReducer';
import {Auth} from '../types/auth.types';

import {fetch} from './fetchReducer';
import {Fetch} from '../types/fetch.types';

import {privateState} from './private/privateReducer';
import {Private} from '../types/private/private.types';

import {main} from './private/mainReducer';
import {Main} from '../types/private/main.types';

import {profile} from './private/profileReducer';
import {Profile} from '../types/private/profile.types';

type RootReducer = {
  auth: Auth;
  fetch: Fetch;
  private: Private;
  main: Main;
  profile: Profile;
};

const rootReducer = combineReducers<RootReducer>({
  auth,
  fetch,
  private: privateState,
  main,
  profile,
});

export default rootReducer;
