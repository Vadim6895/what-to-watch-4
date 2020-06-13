import React from "react";
import PropTypes from "prop-types";
import MainPage from "../main-page/main-page.jsx";

const App = (props) => {
  const {productionDate, movieName, genre} = props;
  const {movieNames} = props;

  return (
    <MainPage productionDate={productionDate} movieName={movieName} genre={genre} movieNames={movieNames}/>
  );
};

App.propTypes = {
  productionDate: PropTypes.string.isRequired,
  movieName: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired
};

App.propTypes = {
  movieNames: PropTypes.array.isRequired
};

export default App;
