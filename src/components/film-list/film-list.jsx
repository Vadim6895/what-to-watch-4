import React, {PureComponent} from "react";
import FilmCard from "../film-card/film-card.jsx";
import PropTypes from "prop-types";
import ShowMore from "../show-more/show-more.jsx";
import {FilmPropTypes} from "../../prop-types.js";
import withActivePlayer from "../../hocks/with-video-player.jsx";
import withFilmList from "../../hocks/with-film-list.jsx";

class FilmList extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderFilmList(actualCards, renderPlayer) {
    const cardsArr = actualCards.map((filmCard, index) => {
      return (
        <FilmCard name={filmCard.movieName}
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
      onClick, renderPlayer} = this.props;

    if (actualCardsCount < actualCards.length) {
      return (
        <React.Fragment>
          {this._renderFilmList(newCards, renderPlayer)}
          <ShowMore onShowMoreClick={onClick}/>
        </React.Fragment>
      );
    }
    if (actualCardsCount >= actualCards.length) {
      return (
        <React.Fragment>
          {this._renderFilmList(actualCards, renderPlayer)}
        </React.Fragment>
      );
    }
    return null;
  }
}

FilmList.propTypes = {
  renderPlayer: PropTypes.func.isRequired,
  actualCardsCount: PropTypes.number.isRequired,
  actualCards: PropTypes.arrayOf(FilmPropTypes),
  newCards: PropTypes.arrayOf(FilmPropTypes),
  onClick: PropTypes.func.isRequired,
};

const FilmListWrapped = withActivePlayer(FilmList);
const FilmListSecondWrapped = withFilmList(FilmListWrapped);

export {FilmList};
export default FilmListSecondWrapped;
