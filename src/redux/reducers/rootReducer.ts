import {combineReducers} from 'redux';

import {auth} from './authReducer';
import {Auth} from '../types/auth.types';

import {fetch} from './fetchReducer';
import {Fetch} from '../types/fetch.types';

import {privateState} from './private/privateReducer';
import {Private} from '../types/private/private.types';

import {main} from './private/mainReducer';
import {Main} from '../types/private/main.types';

type RootReducer = {auth: Auth; fetch: Fetch; private: Private; main: Main};

const rootReducer = combineReducers<RootReducer>({
  auth,
  fetch,
  private: privateState,
  main,
});

export default rootReducer;
