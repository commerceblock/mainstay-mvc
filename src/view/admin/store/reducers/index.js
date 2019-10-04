import {combineReducers} from 'redux';
import auth from './auth/reducer';
import clientDetails from './client_details/reducer';

const rootReducer = combineReducers({
    auth,
    clientDetails
});

export default rootReducer;
