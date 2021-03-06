import axios from 'axios';
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from '../helpers/endpoints';
import { types } from './types';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../helpers/setAuthToken';

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
        type: type.authLogin,
        payload: { user, loggedIn }
    };
}