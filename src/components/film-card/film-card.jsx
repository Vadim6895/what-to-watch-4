import React from "react";
import PropTypes from "prop-types";

const FilmCard = (props) => {
  const {name, moviePoster, id, onFilmClick} = props;
  const updateActiveCard = () => {
    onFilmClick(id);
  };

  /* const getId = () => {
    onMouseEnter(id);
  };*/

  return (
    <article className="small-movie-card catalog__movies-card" onClick={() => updateActiveCard()} >
      <div className="small-movie-card__image">
        <img src={moviePoster} alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="#">{name}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  name: PropTypes.string.isRequired,
  moviePoster: PropTypes.string.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default FilmCard;
