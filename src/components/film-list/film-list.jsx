import React, {PureComponent} from "react";
import FilmCard from "../film-card/film-card.jsx";
import PropTypes from "prop-types";

import ShowMore from "../show-more/show-more.jsx";

class FilmList extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderFilmList(actualCards, onFilmClick, renderPlayer) {
    const cardsArr = actualCards.map((filmCard, index) => {
      return (
        <FilmCard name={filmCard.movieName}
          onFilmClick={onFilmClick}
          moviePreview={filmCard.moviePreview}
          key={filmCard.movieName + index.toString()}
          id={filmCard.id}
          previewSrc={filmCard.previewSrc}
          renderPlayer={renderPlayer}
        />
      );
    });
    return (
      cardsArr
    );
  }

  render() {
    const {actualCardsCount, actualCards, newCards,
      onClick, onFilmClick, renderPlayer} = this.props;

    if (actualCardsCount < actualCards.length) {
      return (
        <React.Fragment>
          {this._renderFilmList(newCards, onFilmClick, renderPlayer)}
          <ShowMore onShowMoreClick={onClick}/>
        </React.Fragment>
      );
    }
    if (actualCardsCount >= actualCards.length) {
      return (
        <React.Fragment>
          {this._renderFilmList(actualCards, onFilmClick, renderPlayer)}
        </React.Fragment>
      );
    }
    return null;
  }
}

FilmList.propTypes = {
  onFilmClick: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  actualCardsCount: PropTypes.number.isRequired,
  actualCards: PropTypes.array.isRequired,
  newCards: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default FilmList;
