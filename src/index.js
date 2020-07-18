import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";

import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";


import {createAPI} from "./api.js";
import thunk from "redux-thunk";
import {actionRequireAuthorizationCreator, AuthorizationStatus, Operation} from "./reducer.js";
// window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f


const onUnauthorized = () => {
  store.dispatch(actionRequireAuthorizationCreator(AuthorizationStatus.NO_AUTH));
};
const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

// store.dispatch(Operation.loadFilmCards());

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
