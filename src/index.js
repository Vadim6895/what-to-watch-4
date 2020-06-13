import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";

const filmData = {
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`
};

const MOVIE_NAMES = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

ReactDom.render(
    <App productionDate={filmData.productionDate} movieName={filmData.movieName} genre={filmData.genre} movieNames={MOVIE_NAMES}/>,
    document.querySelector(`#root`)
);
