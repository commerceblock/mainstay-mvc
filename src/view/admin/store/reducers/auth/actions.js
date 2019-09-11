import * as types from './types';
import axios from 'axios';

export const login = (login, password) => (dispatch) => {
    const data = {
        login,
        password
    };

    return axios({
        url: '/suadmin/login',
        method: 'post',
        data: data,
    }).then(response => {
        // fetch access token and store in local-storage
        const accessToken = response.headers['access-token'];

        localStorage.setItem('access_token', accessToken);

        dispatch({
            type: types.LOGIN,
            payload: 'logged-in'
        });
    }).catch(error => {
        console.error(error);
        dispatch({
            type: types.LOGIN_ERROR,
            payload: error.response.data.error.message
        });
    });
};

export const logout = () => (dispatch) => {
    dispatch({
        type: types.LOGOUT,
        payload: 'logged-out'
    });
};
