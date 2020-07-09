import React, {PureComponent} from "react";
import FilmCard from "../film-card/film-card.jsx";
import PropTypes from "prop-types";

import ShowMore from "../show-more/show-more.jsx";
import {CARDS_COUNT} from "../../const.js";

class FilmList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      genreCards: this.props.activeGenreCards,
    };
  }

  _renderFilmList(actualCards, onFilmClick, renderPlayer) {
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
    return (
      cardsArr
    );
  }

  _changeState() {
    this.setState({step: this.state.step + 1});
  }

  /* componentWillReceiveProps() {
    console.log(`props wiil recive`);
    this.setState({step: 1});
  }*/

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.activeGenreCards !== prevState.genreCards) {
      return {
        step: 1,
        genreCards: nextProps.activeGenreCards,
      };
    }
    return null;
  }

  render() {
    const {filmCards, onFilmClick} = this.props;
    const {renderPlayer} = this.props;
    const {activeGenreCards} = this.props;

    let actualCards = filmCards;
    if (activeGenreCards.length) {
      actualCards = activeGenreCards;
    }

    let actualCardsCount = CARDS_COUNT * this.state.step;
    let newCards = actualCards.slice(0, actualCardsCount);

    if (actualCardsCount < actualCards.length) {
      return (
        <React.Fragment>
          {this._renderFilmList(newCards, onFilmClick, renderPlayer)}
          <ShowMore onShowMoreClick={this._changeState.bind(this)}/>
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
  filmCards: PropTypes.array.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  activeGenreCards: PropTypes.array.isRequired,
};
export default FilmList;
