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
import {Operation as UserOperation} from "./reducer/user/user.js";
// import {AuthorizationStatus} from "./const.js";

import store from "./reducer/store.js";

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
      <div style={{width: `100%`, height: `100vh`, background: `rgb(0, 0, 0)`}}>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{margin: `auto`, paddingTop: `100px`, background: `rgb(0, 0, 0)`, display: `block`, shapeRendering: `auto`}}
          width="204px" height="204px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <g>
            <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#0071bf" strokeWidth="12"></path>
            <path d="M49 0L49 30L64 15L49 0" fill="#0071bf"></path>
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="4.761904761904762s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
          </g>
        </svg>
      </div>,
      document.querySelector(`#root`)
  );
};

const error = (err) => {
  ReactDom.render(
      <div style={{width: `100%`, height: `100vh`, background: `rgb(0, 0, 0)`}}>
        <div style={{background: `rgb(0, 0, 0)`, margin: `0 auto`, width: `600px`, color: `white`, fontSize: `30px`, paddingTop: `20px`}}>Произошла ошибка при загрузке страницы</div>
        <p style={{background: `rgb(0, 0, 0)`, margin: `0 auto`, width: `500px`, color: `white`, paddingTop: `50px`}}>Попробуйте позже...</p>
        <p style={{background: `rgb(0, 0, 0)`, margin: `0 auto`, width: `500px`, color: `white`, paddingTop: `50px`}}>{err.toString()}</p>
      </div>,
      document.querySelector(`#root`)
  );
};

loading();
Promise.all(baseLoadOperations).then(() => {
  initializeApp();
}).catch((err) => {
  error(err);
});
