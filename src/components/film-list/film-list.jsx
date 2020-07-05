import React, {PureComponent} from "react";
import FilmCard from "../film-card/film-card.jsx";
import PropTypes from "prop-types";

class FilmList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {filmCards, onFilmClick} = this.props;
    const {renderPlayer} = this.props;
    const {activeGenreCards} = this.props;

    let actualCards = filmCards;
    if (activeGenreCards.length) {
      actualCards = activeGenreCards;
    }

    const cardsArr = actualCards.map((filmCard, index) => {
      return (
        <FilmCard name={filmCard.movieName}
          onFilmClick={onFilmClick}
          moviePoster={filmCard.moviePoster}
          key={filmCard.movieName + index.toString()}
          id={filmCard.id}
          src={filmCard.src}
          renderPlayer={renderPlayer}
        />
      );
    });
    return cardsArr;
  }
}

FilmList.propTypes = {
  filmCards: PropTypes.array.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  activeGenreCards: PropTypes.array.isRequired,
};
export default FilmList;
