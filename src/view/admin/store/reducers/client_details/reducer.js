import * as types from './types';

const defaultState = {items: []};

function clientDetails (state = defaultState, action) {
    switch (action.type) {
        case types.FETCH_IN_PROGRESS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case types.FETCHED:
            return {
                ...state,
                loading: false,
                items: [...action.payload],
                error: null
            };

        case types.FETCH_ERROR:
            return {
                ...state,
                loading: false,
                items: [],
                error: action.payload
            };

        case types.SAVE_IN_PROGRESS:
            return {
                ...state,
                saving: true,
                error: null
            };

        case types.CLIENT_UPDATED:
        case types.CLIENT_CREATED:
            return {
                ...state,
                saving: false,
                error: null
            };

        case types.CLIENT_CREATE_ERROR:
        case types.CLIENT_UPDATE_ERROR:
            return {
                ...state,
                saving: false,
                error: action.payload
            };

        default:
            return state;

    }
}

export default clientDetails;
