import React from "react";
import PropTypes from "prop-types";
import MainPage from "../main-page/main-page.jsx";

const App = (props) => {
  const {productionDate, movieName, genre} = props;
  const {MOVIE_NAMES} = props;

  return (
    <MainPage productionDate={productionDate} movieName={movieName} genre={genre} MOVIE_NAMES={MOVIE_NAMES}/>
  );
};

App.propTypes = {
  productionDate: PropTypes.string.isRequired,
  movieName: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired
};

App.propTypes = {
  MOVIE_NAMES: PropTypes.array.isRequired
};

export default App;
