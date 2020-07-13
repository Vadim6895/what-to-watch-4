import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {getGenresOfCards} from "../../utils.js";
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

  _createGenreItem(genre, key, activeItem) {
    const {onItemClick} = this.props;

    return (
      <li className={genre === activeItem ? GenresLinkMap.ACTIVE_LINK : GenresLinkMap.LINK} key={key} onClick={(evt) => {
        onItemClick(evt.target.textContent);
      }}>
        <a href="#" className="catalog__genres-link">{genre}</a>
      </li>
    );
  }

  _createGenresList() {
    const {filmCards} = this.props;
    const genres = getGenresOfCards(filmCards);
    const {onItemClick, activeItem} = this.props;

    return (
      <React.Fragment>
        <ul className="catalog__genres-list">
          <li className={activeItem === `` || activeItem === GenresMap.ALL_GENRES ? GenresLinkMap.ACTIVE_LINK : GenresLinkMap.LINK}
            onClick={(evt) => {
              onItemClick(evt.target.textContent);
            }}>
            <a href="#" className="catalog__genres-link">All genres</a>
          </li>
          {genres.map((genre, index) => {
            return this._createGenreItem(genre, index + new Date(), activeItem);
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
  onItemClick: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  // activeGenre: PropTypes.string.isRequired,
};

export default GenresList;
