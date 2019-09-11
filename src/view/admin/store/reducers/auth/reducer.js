import * as types from './types';

function auth (state = {}, action) {
    switch (action.type) {
        case types.LOGIN:
            return {
                isLoggedIn: true
            };

        case types.LOGOUT:
            return {
                isLoggedIn: false
            };

        case types.LOGIN_ERROR:
            return {
                isLoggedIn: false,
                error: action.payload
            };

        default:
            return state;

    }
}

export default auth;
