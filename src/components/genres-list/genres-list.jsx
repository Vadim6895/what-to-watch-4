import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {getGenresOfCards} from "../../reducer/step/selectors.js";
import {GenresLinkMap, GenresMap} from "../../const.js";

class GenresList extends PureComponent {
  constructor(props) {
    super(props);
  }

  /* _getActiveLink(genre) {
    const {activeItem} = this.props;

    let activeLink = GenresLinkMap.LINK;
    if (genre === activeItem) {
      activeLink = GenresLinkMap.ACTIVE_LINK;
    }
    return activeLink;
  }*/

  _createGenreItem(genre, key, activeGenre) {
    const {onGenreClick} = this.props;

    return (
      <li className={genre === activeGenre ? GenresLinkMap.ACTIVE_LINK : GenresLinkMap.LINK} key={key} onClick={(evt) => {
        onGenreClick(evt.target.textContent);
      }}>
        <a href="#" className="catalog__genres-link">{genre}</a>
      </li>
    );
  }

  _createGenresList() {
    const {filmCards} = this.props;
    const genres = getGenresOfCards(filmCards);
    const {onGenreClick, activeGenre} = this.props;

    return (
      <React.Fragment>
        <ul className="catalog__genres-list">
          <li className={activeGenre === `` || activeGenre === GenresMap.ALL_GENRES ? GenresLinkMap.ACTIVE_LINK : GenresLinkMap.LINK}
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
};

export default GenresList;
