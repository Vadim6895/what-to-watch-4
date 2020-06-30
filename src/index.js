import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";

import {filmCardsMock} from "./mocks/films.js";
console.log(filmCardsMock);

ReactDom.render(
    <App filmCards={filmCardsMock}/>,
    document.querySelector(`#root`)
);
