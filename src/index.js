import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";

// import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";

// import reducer from "./reducer/reducer.js";

// import {createAPI} from "./api.js";
// import thunk from "redux-thunk";
// import {actionRequireAuthorizationCreator, AuthorizationStatus, Operation} from "./reducer.js";
import {Operation as DataOperation} from "./reducer/data/data.js";
// import {ActionCreator} from "./reducer/user/user.js";
// import {AuthorizationStatus} from "./const.js";


import store from "./reducer/store.js";

store.dispatch(DataOperation.loadFilmCards());
store.dispatch(DataOperation.loadPromoMovie());

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

export default store;
