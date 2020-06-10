import React from "react";
import MainPage from "../main-page/main-page.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {productionDate, movieName, genre} = props;

  return (
    <MainPage productionDate={productionDate} movieName={movieName} genre={genre}/>
  );
};

export default App;
