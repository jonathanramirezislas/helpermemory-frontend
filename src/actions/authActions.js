import axios from 'axios';
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from '../shared/enpoints';
import { types } from '../types/types';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../helpers/axios/setAuthToken';

/* Login*/
export const loginUser = (userData) => (dispatch) => {   
	return new Promise((resolve, reject) => {
		axios
			.post(LOGIN_ENDPOINT, userData, {
				headers: { Accept: 'application/json', 'Content-type': 'application/json' },
			})
			.then((response) => {//sucess
                //get token from header and save in localStorage
				const { authorization } = response.headers;
				localStorage.setItem('jwtToken', authorization);

				//set token to axios to each request
				setAuthToken(authorization);

				//decode token 
				const decoded = jwt_decode(authorization);
				//token 		
				dispatch(login({ user: decoded, loggedIn: true }));

				resolve(response); //return response
			})
			.catch((error) => {
				reject(error);
			});
	});
};


export const login = ({ user, loggedIn }) => {
    return {
        type: types.authLogin,
        payload: { user, loggedIn }
    };
}


export const logoutUser = () => dispatch => {
	//rome token from localStorage
	localStorage.removeItem('jwtToken');
	//remove the token from headers from axios
    setAuthToken(false);
	//clean the store the user
    dispatch(login({
        user: {},
        loggedIn: false 
    }));
}


export const registerUser = (userData) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post(REGISTER_ENDPOINT, userData, {
            headers: {'Accept': 'application/json', 'Content-type': 'application/json'}
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}