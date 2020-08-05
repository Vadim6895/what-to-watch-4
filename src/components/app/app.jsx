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

  // _renderMainScreen() {
  //  const {onFilmClick, onGenreClick, promoMovie} = this.props;


  // if (selectedFilmId === -1 && !bigPlayerValue) {
  // return (
  //  <MainPage // filmCards={filmCards}
  //    promoMovie={promoMovie}
  //    onFilmClick={(id) => {
  //      onFilmClick(id);
  //    }}
  //    onGenreClick={(genre) => {
  //      onGenreClick(genre);
  //    }}
  // activeGenreCards={activeGenreCards}
  // activeGenre={activeGenre}
  // authorizationStatus={authorizationStatus}
  //  />
  // );
  // }
  // if (selectedFilmId !== -1 && !bigPlayerValue) {
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
  // history.push(`/movies/${selectedFilmId}`);
  // );
  // }
  /* if (bigPlayerValue) {
      if (selectedFilmId === -1) {
        activeCard = promoMovie;
      }
      return (
        <BigVideoPlayerWrapped
          activeCard={activeCard}
          onPlayerClick={(value) =>{
            onPlayerClick(value);
          }}
        />*/
  // );
  // }

  // return null;

  // }

  render() {
    const {onFilmClick, login, authorizationStatus, promoMovie} = this.props;
    const {activeCard, relatedMovies, selectedFilmId, onGenreClick} = this.props;
    let activeCardForPlayer;
    if (selectedFilmId === -1) {
      activeCardForPlayer = promoMovie; // кусочек старой логики
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

          <Route exact path={AppRout.REVIEW + selectedFilmId}>
            <AddReviewWrapped
              activeCard={activeCard}
            />
          </Route>

          <Route exact path={AppRout.LOGIN}>
            <SignInWrapped onSubmit={login}/>;
          </Route>

          <Route exact path={AppRout.FILMS + selectedFilmId}>
            <MoviePage
              activeCard={activeCard}
              onFilmClick={(id) => {
                onFilmClick(id);
              }}
              relatedMovies={relatedMovies}
              authorizationStatus={authorizationStatus}
            />;
          </Route>

          <Route exact path={AppRout.PLAYER + activeCardForPlayer.id}>
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
  // filmCards: PropTypes.array.isRequired,
  promoMovie: PropTypes.object.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  selectedFilmId: PropTypes.number.isRequired,

  // bigPlayerValue: PropTypes.bool.isRequired,
  // onPlayerClick: PropTypes.func.isRequired,

  onGenreClick: PropTypes.func.isRequired,
  // activeGenre: PropTypes.string.isRequired,

  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,

  activeCard: PropTypes.object.isRequired,
  // activeGenreCards: PropTypes.array.isRequired,
  relatedMovies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const selectedFilmId = getSelectedFilmId(state);
  // const filmCards = getFilmCards(state);
  const activeCard = getActiveCard(state);

  // const activeGenreCards = getCardsOnGenre(state);
  const relatedMovies = getRelatedMovies(state);
  return {
    selectedFilmId,
    bigPlayerValue: getbigPlayerValue(state),
    // activeGenre: getActiveGenre(state),
    // filmCards,
    promoMovie: getPromoMovie(state),
    authorizationStatus: getAuthorizationStatus(state),
    activeCard,
    // activeGenreCards,
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
