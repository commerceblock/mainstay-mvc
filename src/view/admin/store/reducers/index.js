import {combineReducers} from 'redux';
import auth from './auth/reducer';
import clientDetails from './client-details/reducer';
import clientSignUp from './client-sign-up/reducer';

const rootReducer = combineReducers({
    auth,
    clientDetails,
    clientSignUp
});

export default rootReducer;
