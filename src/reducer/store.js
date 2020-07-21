import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';
import {ActionCreator} from "../reducer/user/user.js";
import {AuthorizationStatus} from "../const.js";
import reducer from './reducer.js';
import {createAPI} from '../api.js';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};
const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

export default store;
