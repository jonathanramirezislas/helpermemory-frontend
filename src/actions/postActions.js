import axios from 'axios';
import { types } from '../types/types';
import { USER_POSTS_ENDPOINT } from '../shared/enpoints';

export const getUserPosts = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get(USER_POSTS_ENDPOINT)
        .then(response => {
            dispatch({
                type: types.setUserPosts,
                payload: { fetched: true, posts: response.data }
            })

            resolve(response)
        })
        .catch(err => {
            reject(err)
        })
    });
}