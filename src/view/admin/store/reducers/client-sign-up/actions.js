import * as types from './types';
import * as authTypes from '../auth/types';
import apiService from '../../../../../helpers/api-service';

const handle401ErrorAndDispatch = (error, dispatch) => {
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
        url: '/admin/client_sign_up',
        method: 'get',
    }).then((response) => {
        dispatch({
            type: types.FETCHED,
            payload: response.data.data
        });
    }).catch(error => {
        const handled = handle401ErrorAndDispatch(error, dispatch);
        if (!handled) {
            dispatch({
                type: types.FETCH_ERROR,
                payload: error.response.data.message
            });
            throw error;
        }
    });
};

