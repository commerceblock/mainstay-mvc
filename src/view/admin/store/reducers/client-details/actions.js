import * as types from './types';
import * as authTypes from '../auth/types';
import apiService from '../../../../../helpers/api-service';

const handle401Error = (error, dispatch) => {
    if (!error.response || error.response.status === 401) {
        localStorage.removeItem('access_token');
        dispatch({
            type: authTypes.LOGOUT,
        });
        return true;
    }
    return false;
};

export const getList = () => (dispatch) => {
    dispatch({
        type: types.FETCH_IN_PROGRESS,
    });

    return apiService.axiosClient({
        url: '/admin/client_details',
        method: 'get',
    }).then((response) => {
        dispatch({
            type: types.FETCHED,
            payload: response.data.data
        });
    }).catch(error => {
        const handled = handle401Error(error, dispatch);
        if (!handled) {
            dispatch({
                type: types.FETCH_ERROR,
                payload: error.response.data.message
            });
            throw error;
        }
    });
};

export const addClient = (postData) => (dispatch) => {
    dispatch({
        type: types.SAVE_IN_PROGRESS,
    });

    return apiService.axiosClient({
        url: '/admin/client_details',
        method: 'post',
        data: postData,
    }).then((response) => {
        dispatch({
            type: types.CLIENT_CREATED,
            payload: response.data.data
        });
    }).catch(error => {
        const handled = handle401Error(error, dispatch);
        if (!handled) {
            dispatch({
                type: types.CLIENT_CREATE_ERROR,
                payload: error.response.data.message
            });
            throw error;
        }
    });
};

export const updateClient = (clientData) => (dispatch) => {
    dispatch({
        type: types.SAVE_IN_PROGRESS,
    });

    return apiService.axiosClient({
        url: '/admin/client_details',
        method: 'put',
        data: clientData,
    }).then((response) => {
        dispatch({
            type: types.CLIENT_UPDATED,
            payload: response.data.data
        });
    }).catch(error => {
        const handled = handle401Error(error, dispatch);
        if (!handled) {
            dispatch({
                type: types.CLIENT_UPDATE_ERROR,
                payload: error.response.data.message
            });
            throw error;
        }
    });
};
