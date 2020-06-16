import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";

import {filmCardsMock} from "./mocks/films.js";

ReactDom.render(
    // <App productionDate={filmData.productionDate} movieName={filmData.movieName} genre={filmData.genre} movieNames={MOVIE_NAMES}/>,
    <App filmCards={filmCardsMock}/>,
    document.querySelector(`#root`)
);
