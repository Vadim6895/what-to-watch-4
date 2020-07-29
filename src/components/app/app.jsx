import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
// import history from "../../history.js";

import MainPage from "../main-page/main-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import AddReview from "../add-review/add-review.jsx";
import withAddReview from "../../hocks/with-add-review.jsx";
const AddReviewWrapped = withAddReview(AddReview);

// import {AuthorizationStatus} from "../../const.js";

import {ActionCreator} from "../../reducer/step/step.js";
import {connect} from "react-redux";
import {getSelectedFilmId, getbigPlayerValue, getActiveGenre, getActiveCard, getCardsOnGenre, getRelatedMovies} from "../../reducer/step/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getFilmCards, getPromoMovie} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import withBigPlayer from "../../hocks/with-big-video-player.jsx";
const BigVideoPlayerWrapped = withBigPlayer(BigVideoPlayer);

import SignIn from "../sign-in/sign-in.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderMainScreen() {
    const {filmCards, promoMovie} = this.props;
    const {onFilmClick, selectedFilmId, activeCard, activeGenreCards} = this.props;

    const {bigPlayerValue, onPlayerClick, onGenreClick, activeGenre} = this.props;

    const {authorizationStatus} = this.props;

    if (selectedFilmId === -1 && !bigPlayerValue) {
      return (
        <MainPage filmCards={filmCards}
          promoMovie={promoMovie}
          onFilmClick={(id) => {
            onFilmClick(id);
          }}
          onPlayerClick={(value) => {
            onPlayerClick(value);
          }}
          onGenreClick={(genre) => {
            onGenreClick(genre);
          }}
          activeGenreCards={activeGenreCards}
          activeGenre={activeGenre}
        />
      );
    }
    if (selectedFilmId !== -1 && !bigPlayerValue) {
      // let relatedMovies = getRelatedMovies(activeCard, filmCards);
      const {relatedMovies} = this.props;
      return (
        <MoviePage activeCard={activeCard}
          onFilmClick={(id) => {
            onFilmClick(id);
          }}
          onPlayerClick={(value) =>{
            onPlayerClick(value);
          }}
          relatedMovies={relatedMovies}
          authorizationStatus={authorizationStatus}
        />
      );
    }
    if (bigPlayerValue) {
      if (selectedFilmId === -1) {
        activeCard = promoMovie;
      }
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
    const {filmCards} = this.props;
    const {login} = this.props; // history={history}
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainScreen(this.props)}
          </Route>
          <Route exact path="/dev-review">
            <AddReviewWrapped
              filmCard={filmCards[5]}
            />
          </Route>
          <Route exact path="/login">
            <SignIn onSubmit={login}/>;
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  filmCards: PropTypes.array.isRequired,
  promoMovie: PropTypes.object.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  selectedFilmId: PropTypes.number.isRequired,

  bigPlayerValue: PropTypes.bool.isRequired,
  onPlayerClick: PropTypes.func.isRequired,

  onGenreClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,

  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,

  activeCard: PropTypes.object.isRequired,
  activeGenreCards: PropTypes.array.isRequired,
  relatedMovies: PropTypes.array.isRequired,
};

/* const mapStateToProps = (state) => ({
  selectedFilmId: getSelectedFilmId(state),
  bigPlayerValue: getbigPlayerValue(state),
  activeGenre: getActiveGenre(state),
  filmCards: getFilmCards(state),
  promoMovie: getPromoMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
});*/

const mapStateToProps = (state) => {
  const selectedFilmId = getSelectedFilmId(state);
  const filmCards = getFilmCards(state);
  const activeCard = getActiveCard(state);

  // const activeGenre = getActiveGenre(state);
  const activeGenreCards = getCardsOnGenre(state);
  const relatedMovies = getRelatedMovies(state);
  return {
    selectedFilmId,
    bigPlayerValue: getbigPlayerValue(state),
    activeGenre: getActiveGenre(state),
    filmCards,
    promoMovie: getPromoMovie(state),
    authorizationStatus: getAuthorizationStatus(state),
    activeCard,
    activeGenreCards,
    relatedMovies,
  };
};

const mapDispatchToPtops = (dispatch) => ({
  onFilmClick(id) {
    dispatch(ActionCreator.selectedFilmId(id));
  },
  onPlayerClick(value) {
    dispatch(ActionCreator.player(value));
  },
  onGenreClick(genre) {
    dispatch(ActionCreator.activeGenre(genre));
  },
  login(userData) {
    dispatch(UserOperation.login(userData));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToPtops)(App);
