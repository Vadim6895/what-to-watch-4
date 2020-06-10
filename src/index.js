import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";

const filmData = {
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`
};

ReactDom.render(
    <App productionDate={filmData.productionDate} movieName={filmData.movieName} genre={filmData.genre}/>,
    document.querySelector(`#root`)
);
