import {combineReducers} from 'redux';

import {token} from './authReducer';
import {Token} from '../types/auth.types';

type RootReducer = {token: Token};

const rootReducer = combineReducers<RootReducer>({token});

export default rootReducer;
