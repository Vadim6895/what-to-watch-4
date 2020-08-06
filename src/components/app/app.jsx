import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import history from "../../history.js";

import MainPage from "../main-page/main-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import AddReview from "../add-review/add-review.jsx";
import withAddReview from "../../hocks/with-add-review.jsx";
const AddReviewWrapped = withAddReview(AddReview);

import Mylist from "../my-list/my-list.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import {AppRout} from "../../const.js";

import {ActionCreator} from "../../reducer/step/step.js";
import {connect} from "react-redux";
import {getSelectedFilmId, getbigPlayerValue,
  getActiveCard, getRelatedMovies} from "../../reducer/step/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getPromoMovie} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import withBigPlayer from "../../hocks/with-big-video-player.jsx";
const BigVideoPlayerWrapped = withBigPlayer(BigVideoPlayer);

import SignIn from "../sign-in/sign-in.jsx";
import withSignIn from "../../hocks/with-sign-in.jsx";
const SignInWrapped = withSignIn(SignIn);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {onFilmClick, login, authorizationStatus, promoMovie} = this.props;
    const {activeCard, relatedMovies, selectedFilmId, onGenreClick} = this.props;
    let activeCardForPlayer;
    if (selectedFilmId === -1) {
      activeCardForPlayer = promoMovie;
    } else {
      activeCardForPlayer = activeCard;
    }

    return (
      <Router history={history}>
        <Switch>

          <Route exact path={AppRout.MAIN_PAGE}>
            <MainPage
              promoMovie={promoMovie}
              onFilmClick={(id) => {
                onFilmClick(id);
              }}
              onGenreClick={(genre) => {
                onGenreClick(genre);
              }}
            />
          </Route>

          <Route exact path={AppRout.REVIEW}>
            <AddReviewWrapped
              activeCard={activeCard}
            />
          </Route>

          <Route exact path={AppRout.LOGIN}>
            <SignInWrapped onSubmit={login}/>;
          </Route>

          <Route exact path={AppRout.FILMS}>
            <MoviePage
              activeCard={activeCard}
              onFilmClick={(id) => {
                onFilmClick(id);
              }}
              relatedMovies={relatedMovies}
              authorizationStatus={authorizationStatus}
            />;
          </Route>

          <Route exact path={AppRout.PLAYER}>
            <BigVideoPlayerWrapped
              activeCard={activeCardForPlayer}
            />
          </Route>

          <PrivateRoute
            exact
            path={AppRout.MY_LIST}
            authorizationStatus={authorizationStatus}
            render={() => {
              return (
                <Mylist onFilmClick={onFilmClick}/>
              );
            }}
          />

        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  promoMovie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    movieName: PropTypes.string.isRequired,
    productionDate: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    moviePoster: PropTypes.string.isRequired,
    moviePreview: PropTypes.string.isRequired,
    previewSrc: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.array.isRequired,
    rating: PropTypes.number.isRequired,
    ratingsQuantity: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    reviews: PropTypes.array.isRequired,
  }).isRequired,

  onFilmClick: PropTypes.func.isRequired,
  selectedFilmId: PropTypes.number.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,

  activeCard: PropTypes.object.isRequired,

  relatedMovies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    movieName: PropTypes.string.isRequired,
    productionDate: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    moviePoster: PropTypes.string.isRequired,
    moviePreview: PropTypes.string.isRequired,
    previewSrc: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.array.isRequired,
    rating: PropTypes.number.isRequired,
    ratingsQuantity: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    reviews: PropTypes.array.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => {
  const selectedFilmId = getSelectedFilmId(state);
  const activeCard = getActiveCard(state);
  const relatedMovies = getRelatedMovies(state);
  return {
    selectedFilmId,
    bigPlayerValue: getbigPlayerValue(state),
    promoMovie: getPromoMovie(state),
    authorizationStatus: getAuthorizationStatus(state),
    activeCard,
    relatedMovies,
  };
};

const mapDispatchToPtops = (dispatch) => ({
  onFilmClick(id) {
    dispatch(ActionCreator.selectedFilmId(id));
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
