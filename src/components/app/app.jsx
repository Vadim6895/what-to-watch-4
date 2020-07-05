import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainPage from "../main-page/main-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

import {getRelatedMovies, getCardsOnGenre} from "../../utils.js";

import {actionSelectedFilmCreator, actionGenreCreator} from "../../reducer.js";
import {connect} from "react-redux";

class App extends PureComponent {
  constructor(props) {
    super(props);

    /* this.state = {
      step: -1,
      selectedFilmId: -1,
    };*/
  }
  _renderMainScreen() {
    const {filmCards} = this.props;
    const {onFilmClick, selectedFilmId} = this.props; // step

    const {activeGenre, onGenreClick} = this.props;

    const activeCard = filmCards.find((filmCard) => filmCard.id === selectedFilmId);
    const activeGenreCards = getCardsOnGenre(activeGenre, filmCards);
    if (selectedFilmId === -1) {

      return (
        <MainPage filmCards={filmCards}
          activeGenreCards={activeGenreCards}
          activeGenre={activeGenre}
          /* onFilmClick={(id) => {
            this.setState({
              selectedFilmId: id,
              step: id,
            });
          }}*/
          onFilmClick={(id) => {
            onFilmClick(id);
          }}
          onGenreClick={(genre) => {
            onGenreClick(genre);
          }}
        />
      );
    }
    if (selectedFilmId !== -1) {
      let relatedMovies = getRelatedMovies(activeCard, filmCards);
      return (
        <MoviePage activeCard={activeCard}
          /* onFilmClick={(id) => {
            this.setState({
              selectedFilmId: id,
              step: id,
            });
          }}*/
          activeGenreCards={activeGenreCards}
          onFilmClick={(id) => {
            onFilmClick(id);
          }}
          relatedMovies={relatedMovies}
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
  // step: PropTypes.number.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  selectedFilmId: PropTypes.number.isRequired,

  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // step: state.step,
  selectedFilmId: state.selectedFilmId,
  activeGenre: state.activeGenre,
});

const mapDispatchToPtops = (dispatch) => ({
  onFilmClick(id) {
    dispatch(actionSelectedFilmCreator(id));
  },
  onGenreClick(genre) {
    dispatch(actionGenreCreator(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToPtops)(App);
