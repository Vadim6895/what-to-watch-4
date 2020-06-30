import React from "react";
import PropTypes from "prop-types";

const FilmCard = (props) => {
  const {name, moviePoster, id, onFilmClick} = props;
  const {renderPlayer, src} = props;
  const updateActiveCard = () => {
    onFilmClick(id);
  };

  return (
    <article className="small-movie-card catalog__movies-card" onClick={() => updateActiveCard()}>
      {renderPlayer(id, src, moviePoster)}
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
  src: PropTypes.string.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default FilmCard;
