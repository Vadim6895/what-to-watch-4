import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";

import {Provider} from "react-redux";

import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation} from "./reducer/user/user.js";
// import {AuthorizationStatus} from "./const.js";

import store from "./reducer/store.js";

import LoadingScreen from "./components/loading-screen/loading-screen.jsx";
import ErrorScreen from "./components/error-screen/error-screen.jsx";

store.dispatch(UserOperation.checkAuth());
const baseLoadOperations = [
  store.dispatch(DataOperation.loadFilmCards()),
  store.dispatch(DataOperation.loadPromoMovie()),
];

const initializeApp = () => {
  ReactDom.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
};

const loading = () => {
  ReactDom.render(
      <LoadingScreen/>,
      document.querySelector(`#root`)
  );
};

const error = (err) => {
  ReactDom.render(
      <ErrorScreen error={err}/>,
      document.querySelector(`#root`)
  );
};

loading();
Promise.all(baseLoadOperations).then(() => {
  initializeApp();
}).catch((err) => {
  error(err);
});
