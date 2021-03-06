import jwt_decode from 'jwt-decode';
import { logoutUser, setCurrentUser } from '../actions/authActions';
import store from "../store";
import setAuthToken from "./setAuthToken";

const checkForToken = () => {
    //if there is a user already logged in 
    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);

        //decode the token from localStorage
        const decoded = jwt_decode(localStorage.jwtToken);      

        //dispacth our action set the token in the store
        store.dispatch(login({
            user: decoded,
            loggedIn: true
        }));

        //check if the token didn't expired
        const currentTime = Math.floor(Date.now() / 1000);//1000 miliseconds

        //of the token expired redirect to login
        if (decoded.exp < currentTime) {
            store.dispatch(logoutUser());
            window.location.href = "/signin"; //redirect to signin
        }

    }
}

export default checkForToken;