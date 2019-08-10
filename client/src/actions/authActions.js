import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register user
export const registerUser = (userdata, history) => dispatch => {
     axios
             .post('/api/users/register', userdata)
             .then(res => history.push('/login')) //redirect user to login page if register is successful
             .catch(err => 
                dispatch(
                    {
                        type: GET_ERRORS,
                        payload: err.response.data
                    }
                ));

}

export const loginUser = userdata => dispatch => {
    axios
            .post('/api/users/login', userdata)
            .then(res => {
                //Save token to localstorage
                const {token} = res.data;
                localStorage.setItem('jwtToken', token); //key value pair

                //Set the token to axios header
                setAuthToken(token);
                //Decode the token
                const decoded = jwt_decode(token);

                //dispatch SET_CURRENT_USER
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: decoded
                })
            }
                )
            .catch(err => 
                dispatch(
                    {
                        type: GET_ERRORS,
                        payload: err.response.data
                    }
                ));

}


