import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainPage from "../main-page/main-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";


import {getRelatedMovies, getCardsOnGenre} from "../../utils.js";
import {MORE_LIKE_THIS_COUNT} from "../../const.js";
import {actionSelectedFilmCreator, actionPlayerCreator, actionGenreCreator} from "../../reducer.js";
import {connect} from "react-redux";

import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import withBigPlayer from "../../hocks/with-big-video-player.jsx";
const BigVideoPlayerWrapped = withBigPlayer(BigVideoPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderMainScreen() {
    const {filmCards} = this.props;
    const {onFilmClick, selectedFilmId} = this.props;
    const activeCard = filmCards.find((filmCard) => filmCard.id === selectedFilmId);
    const {bigPlayerValue, onPlayerClick, onGenreClick, activeGenre} = this.props;

    const activeGenreCards = getCardsOnGenre(activeGenre, filmCards);
    if (selectedFilmId === -1 && !bigPlayerValue) {
      return (
        <MainPage filmCards={filmCards}
          onFilmClick={(id) => {
            onFilmClick(id);
          }}
          onPlayerClick={(value) =>{
            onPlayerClick(value);
          }}
          onGenreClick={(genre) =>{
            onGenreClick(genre);
          }}
          activeGenreCards={activeGenreCards}
          activeGenre={activeGenre}
        />
      );
    }
    if (selectedFilmId !== -1 && !bigPlayerValue) {
      let relatedMovies = getRelatedMovies(activeCard, filmCards).slice(0, MORE_LIKE_THIS_COUNT);
      return (
        <MoviePage activeCard={activeCard}
          onFilmClick={(id) => {
            onFilmClick(id);
          }}
          onPlayerClick={(value) =>{
            onPlayerClick(value);
          }}
          relatedMovies={relatedMovies}
        />
      );
    }
    if (bigPlayerValue) {
      return (
        <BigVideoPlayerWrapped
          activeCard={activeCard}
          onPlayerClick={(value) =>{
            onPlayerClick(value);
          }}
        />
      );
    }

    return null;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainScreen(this.props)}
          </Route>
          <Route exact path="/?">
          </Route>
          <Route exact path="/*?*">
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  filmCards: PropTypes.array.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  selectedFilmId: PropTypes.number.isRequired,

  bigPlayerValue: PropTypes.bool.isRequired,
  onPlayerClick: PropTypes.func.isRequired,

  onGenreClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  selectedFilmId: state.selectedFilmId,
  bigPlayerValue: state.bigPlayerValue,
  activeGenre: state.activeGenre,
  filmCards: state.filmCards,
});

const mapDispatchToPtops = (dispatch) => ({
  onFilmClick(id) {
    dispatch(actionSelectedFilmCreator(id));
  },
  onPlayerClick(value) {
    dispatch(actionPlayerCreator(value));
  },
  onGenreClick(genre) {
    dispatch(actionGenreCreator(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToPtops)(App);
