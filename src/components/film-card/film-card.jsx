import React from "react";
import PropTypes from "prop-types";

const FilmCard = (props) => {
  const {name, moviePreview, id, onFilmClick} = props;
  const {renderPlayer, previewSrc} = props;
  const updateActiveCard = () => {
    onFilmClick(id);
  };

  return (
    <article className="small-movie-card catalog__movies-card" onClick={() => updateActiveCard()}>
      {renderPlayer(id, previewSrc, moviePreview)}
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="#">{name}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  name: PropTypes.string.isRequired,
  moviePreview: PropTypes.string.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  previewSrc: PropTypes.string.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default FilmCard;
