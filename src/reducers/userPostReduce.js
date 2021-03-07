import { types } from "../types/types";

const initialState = {posts: [], fetched: false};

 const userPostReducer=(state = initialState, action)=> {
    const { type, payload } = action;
    
    switch(type) {
        case types.setUserPosts:
            return {
                ...state,
                fetched: payload.fetched,
                posts: payload.posts
            }
        default:
            return state;
    }
}

export default userPostReducer
