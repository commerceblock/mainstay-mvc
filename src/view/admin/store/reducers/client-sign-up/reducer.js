import * as types from './types';

const defaultState = {
    items: [],
    statuses: []
};

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
                items: [...action.payload.clientSignups],
                statuses: [...action.payload.statuses],
                error: null
            };

        case types.FETCH_ERROR:
            return {
                ...state,
                loading: false,
                items: [],
                error: action.payload
            };

        case types.UPDATE_STATUS_DONE:
            const item = state.items.find(item => item._id === action.payload._id);
            item.status = action.payload.status;
            return {
                ...state,
                loading: false,
                items: [...state.items],
                error: action.payload
            };

        default:
            return state;

    }
}

export default clientSignUp;
