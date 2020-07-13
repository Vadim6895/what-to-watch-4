import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainPage from "../main-page/main-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

import withActiveItem from "../../hocks/with-active-item.jsx";
const MainPageWrapped = withActiveItem(MainPage);

import {getRelatedMovies} from "../../utils.js";
import {MORE_LIKE_THIS_COUNT} from "../../const.js";
import {actionSelectedFilmCreator} from "../../reducer.js";
import {connect} from "react-redux";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderMainScreen() {
    const {filmCards} = this.props;
    const {onFilmClick, selectedFilmId} = this.props;
    const activeCard = filmCards.find((filmCard) => filmCard.id === selectedFilmId);

    if (selectedFilmId === -1) {
      return (
        <MainPageWrapped filmCards={filmCards}
          onFilmClick={(id) => {
            onFilmClick(id);
          }}
        />
      );
    }
    if (selectedFilmId !== -1) {
      let relatedMovies = getRelatedMovies(activeCard, filmCards).slice(0, MORE_LIKE_THIS_COUNT);
      return (
        <MoviePage activeCard={activeCard}
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
  onFilmClick: PropTypes.func.isRequired,
  selectedFilmId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  selectedFilmId: state.selectedFilmId,
});

const mapDispatchToPtops = (dispatch) => ({
  onFilmClick(id) {
    dispatch(actionSelectedFilmCreator(id));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToPtops)(App);
