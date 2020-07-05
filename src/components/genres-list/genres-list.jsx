import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {getGenresOfCards} from "../../utils.js";

class GenresList extends PureComponent {
  constructor(props) {
    super(props);

    /* this.state = {
      activeGenre: `All genres`
    };*/
  }

  /* _changeStateGenre(evt) {
    this.setState({activeGenre: evt});
  }*/

  _getActiveLink(genreCard) {
    const {activeGenre} = this.props; // this.state

    let activeLink = `catalog__genres-item`;
    if (genreCard === activeGenre) {
      activeLink = `catalog__genres-item catalog__genres-item--active`;
    }
    return activeLink;
  }

  _createGenreItem(genre, key) {
    const {onGenreClick} = this.props;

    return (
      <li className={this._getActiveLink(genre)} key={key} onClick={(e) => {
        onGenreClick(e.target.textContent);
      }}>
        <a href="#" className="catalog__genres-link">{genre}</a>
      </li>
    );
  }

  _createGenresList() {
    const {filmCards} = this.props;
    const genres = getGenresOfCards(filmCards);

    const {onGenreClick} = this.props;

    return (
      <React.Fragment>
        <ul className="catalog__genres-list">
          <li className={this._getActiveLink(`All genres`)} onClick={(e) => {
            onGenreClick(e.target.textContent);
          }}>
            <a href="#" className="catalog__genres-link">All genres</a>
          </li>
          {genres.map((genre, index) => {
            return this._createGenreItem(genre, index + new Date());
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
