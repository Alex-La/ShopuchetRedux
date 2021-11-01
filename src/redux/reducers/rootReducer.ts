import {combineReducers} from 'redux';

import {auth} from './authReducer';
import {Auth} from '../types/auth.types';

import {fetch} from './fetchReducer';
import {Fetch} from '../types/fetch.types';

import {main} from './private/mainReducer';
import {Main} from '../types/private/main.types';

import {friends} from './private/friendsReducer';
import {Friends} from '../types/private/friends.types';

type RootReducer = {
  auth: Auth;
  fetch: Fetch;
  main: Main;
  friends: Friends;
};

const rootReducer = combineReducers<RootReducer>({
  auth,
  fetch,
  main,
  friends,
});

export default rootReducer;
