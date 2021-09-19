import {applyMiddleware, combineReducers, compose, createStore} from "redux";

import {reducer as formReducer} from 'redux-form'

import thunkMiddleware from 'redux-thunk'
import mainReducer from "./mainReducer";

let reducers = combineReducers({
    form: formReducer,
    main: mainReducer

});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));



export default store;