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
import {AuthorizationStatus, AppRout} from "../../const.js";

import {ActionCreator} from "../../reducer/step/step.js";
import {connect} from "react-redux";
import {getSelectedFilmId, getbigPlayerValue, getActiveGenre,
  getActiveCard, getCardsOnGenre, getRelatedMovies} from "../../reducer/step/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getFilmCards, getPromoMovie} from "../../reducer/data/selectors.js";
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

  _renderMainScreen() {
    const {filmCards, promoMovie} = this.props;
    const {onFilmClick, selectedFilmId, activeCard, activeGenreCards} = this.props;
    const {bigPlayerValue, onPlayerClick, onGenreClick, activeGenre} = this.props;
    const {authorizationStatus} = this.props;

    if (authorizationStatus === AuthorizationStatus.AUTH) {
      history.push(AppRout.MAIN_PAGE);
    }

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
          authorizationStatus={authorizationStatus}
        />
      );
    }
    if (selectedFilmId !== -1 && !bigPlayerValue) {
      // const {relatedMovies} = this.props;
      // return (
      /* <MoviePage activeCard={activeCard}
          onFilmClick={(id) => {
            onFilmClick(id);
          }}
          onPlayerClick={(value) =>{
            onPlayerClick(value);
          }}
          relatedMovies={relatedMovies}
          authorizationStatus={authorizationStatus}
        />*/
      return history.push(`/movies/${selectedFilmId}`);
      // );
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
    const {filmCards, onFilmClick, login, authorizationStatus} = this.props;
    const {activeCard, onPlayerClick, relatedMovies, selectedFilmId} = this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRout.MAIN_PAGE}>
            {this._renderMainScreen(this.props)}
          </Route>
          <Route exact path={AppRout.DEV_REVIEW}>
            <AddReviewWrapped
              filmCards={filmCards}
            />
          </Route>
          <Route exact path={AppRout.LOGIN}>
            <SignInWrapped onSubmit={login}/>;
          </Route>

          <Route exact path={`/movies${selectedFilmId}`}>
            <MoviePage
              activeCard={activeCard}
              onFilmClick={(id) => {
                onFilmClick(id);
              }}
              onPlayerClick={(value) =>{
                onPlayerClick(value);
              }}
              relatedMovies={relatedMovies}
              authorizationStatus={authorizationStatus}
            />;
          </Route>

          <PrivateRoute exact
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

const mapStateToProps = (state) => {
  const selectedFilmId = getSelectedFilmId(state);
  const filmCards = getFilmCards(state);
  const activeCard = getActiveCard(state);

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
