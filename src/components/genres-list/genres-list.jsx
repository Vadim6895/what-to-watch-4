import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {getGenresOfCards} from "../../reducer/step/selectors.js";
import {GenresLinkMap, GenresMap} from "../../const.js";

import {connect} from "react-redux";
import {getFilmCards} from "../../reducer/data/selectors.js";

class GenresList extends PureComponent {
  constructor(props) {
    super(props);
  }

  _createGenreItem(genre, key, activeGenre) {
    const {onGenreClick} = this.props;

    return (
      <li className={genre === activeGenre ?
        GenresLinkMap.ACTIVE_LINK : GenresLinkMap.LINK}
      key={key}
      onClick={(evt) => {
        onGenreClick(evt.target.textContent);
      }}>
        <a href="#" className="catalog__genres-link">{genre}</a>
      </li>
    );
  }

  _createGenresList() {
    const {onGenreClick, activeGenre, genres} = this.props;

    return (
      <React.Fragment>
        <ul className="catalog__genres-list">
          <li className={activeGenre === `` || activeGenre === GenresMap.ALL_GENRES ?
            GenresLinkMap.ACTIVE_LINK : GenresLinkMap.LINK}
          onClick={(evt) => {
            onGenreClick(evt.target.textContent);
          }}>
            <a href="#" className="catalog__genres-link">All genres</a>
          </li>
          {genres.map((genre, index) => {
            return this._createGenreItem(genre, index + new Date(), activeGenre);
          })}
        </ul>
      </React.Fragment>
    );
  }

  render() {
    return this._createGenresList();
  }
}

GenresList.propTypes = {
  filmCards: PropTypes.array.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,

  genres: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const filmCards = getFilmCards(state);
  const genres = getGenresOfCards(state);

  return {
    filmCards,
    genres,
  };
};

export {GenresList};
export default connect(mapStateToProps)(GenresList);
