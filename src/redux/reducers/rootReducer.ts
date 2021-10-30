import {combineReducers} from 'redux';

import {auth} from './authReducer';
import {Auth} from '../types/auth.types';

import {fetch} from './fetchReducer';
import {Fetch} from '../types/fetch.types';

import {privateState} from './private/privateReducer';
import {Private} from '../types/private/private.types';

type RootReducer = {auth: Auth; fetch: Fetch; private: Private};

const rootReducer = combineReducers<RootReducer>({
  auth,
  fetch,
  private: privateState,
});

export default rootReducer;
