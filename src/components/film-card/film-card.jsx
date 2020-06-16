import React from "react";
import PropTypes from "prop-types";

const FilmCard = (props) => {
  const {name} = props;
  const {btnClickHandler} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" onClick={btnClickHandler}>{name}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  name: PropTypes.string.isRequired,
  btnClickHandler: PropTypes.func.isRequired
};

export default FilmCard;
