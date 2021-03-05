import { types } from '../types/types';

const initialState = {
    loggedIn: false,
     user: {}
    };

const authReducer = (state = initialState, action) => {
    
    const { type, payload } = action;
    
    switch(type) {
        case types.authLogin:
            return {
                ...state,
                ...payload //loggedIn, user
            }
        default:
            return state;
    }
}

export default authReducer