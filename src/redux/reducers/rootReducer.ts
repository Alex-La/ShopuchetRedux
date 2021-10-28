import {combineReducers} from 'redux';

import {auth} from './authReducer';
import {Auth} from '../types/auth.types';

import {fetch} from './fetchReducer';
import {Fetch} from '../types/fetch.types';

type RootReducer = {auth: Auth; fetch: Fetch};

const rootReducer = combineReducers<RootReducer>({auth, fetch});

export default rootReducer;
