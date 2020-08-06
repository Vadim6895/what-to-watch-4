import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {LinkRout} from "../../const.js";

const FilmCard = (props) => {
  const {name, moviePreview, id, onFilmClick,
    previewSrc, renderPlayer} = props;

  const _updateActiveCard = () => {
    onFilmClick(id);
  };

  return (
    <Link to={LinkRout.FILMS + `${id}`} className="small-movie-card catalog__movies-card" onClick={() => _updateActiveCard()}>
      {renderPlayer(id, previewSrc, moviePreview)}
      <h3 className="small-movie-card__title">
        <span className="small-movie-card__link" href="#">{name}</span>
      </h3>
    </Link>
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
