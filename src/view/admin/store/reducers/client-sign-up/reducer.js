import * as types from './types';

const defaultState = {items: []};

function clientSignUp(state = defaultState, action) {
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

        default:
            return state;

    }
}

export default clientSignUp;
