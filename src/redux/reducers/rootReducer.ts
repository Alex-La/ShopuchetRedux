import {combineReducers} from 'redux';

import {auth} from './authReducer';
import {Auth} from '../types/auth.types';

import {fetch} from './fetchReducer';
import {Fetch} from '../types/fetch.types';

import {privateState} from './private/privateReducer';
import {Private} from '../types/private/private.types';

import {main} from './private/mainReducer';
import {Main} from '../types/private/main.types';

import {friends} from './private/friendsReducer';
import {Friends} from '../types/private/friends.types';

type RootReducer = {
  auth: Auth;
  fetch: Fetch;
  private: Private;
  main: Main;
  friends: Friends;
};

const rootReducer = combineReducers<RootReducer>({
  auth,
  fetch,
  private: privateState,
  main,
  friends,
});

export default rootReducer;
