import * as types from './types';
import apiService from '../../../../../helpers/api-service';

export const login = (login, password) => (dispatch) => {
    const data = {
        login,
        password
    };

    return apiService.axiosClient({
        url: '/admin/login',
        method: 'post',
        data: data,
    }).then(response => {
        // fetch access token and store in local-storage
        const accessToken = response.headers['x-access-token'];
        localStorage.setItem('access_token', accessToken);
        apiService.setAccessToken(accessToken);

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
    localStorage.removeItem('access_token');
    apiService.removeAccessToken();

    dispatch({
        type: types.LOGOUT,
        payload: 'logged-out'
    });
};
