import {compose, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

import logger from './middlewares/logger';

const middlewares = [thunk];
let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
    // other store enhancers if any
);

const initialState = {};

export default createStore(rootReducer, initialState, enhancer);
