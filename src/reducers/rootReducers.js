import { combineReducers } from 'redux';

import authReducer  from './authReducer';
import userPostReducer from './userPostReduce';

export const rootReducer = combineReducers({
    auth: authReducer,
    posts: userPostReducer
})