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
// import {getbigPlayerValue} from "../../reducer/step/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getPromoMovie} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import withBigPlayer from "../../hocks/with-big-video-player.jsx";
const BigVideoPlayerWrapped = withBigPlayer(BigVideoPlayer);

import SignIn from "../sign-in/sign-in.jsx";
import withSignIn from "../../hocks/with-sign-in.jsx";
const SignInWrapped = withSignIn(SignIn);
import {FilmPropTypes} from "../../prop-types.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {login, authorizationStatus, promoMovie, onGenreClick} = this.props;
    let activeCardForPlayer;
    if (history.location.pathname === AppRout.MAIN_PAGE) {
      activeCardForPlayer = promoMovie;
    } else {
      activeCardForPlayer = null;
    }

    return (
      <Router history={history}>
        <Switch>

          <Route exact path={AppRout.MAIN_PAGE}>
            <MainPage
              promoMovie={promoMovie}
              onGenreClick={(genre) => {
                onGenreClick(genre);
              }}
            />
          </Route>

          <Route exact path={AppRout.REVIEW}
            render={(props) => (
              <AddReviewWrapped
                match={props.match}
              />
            )}
          />

          <Route exact path={AppRout.LOGIN}>
            <SignInWrapped onSubmit={login}/>;
          </Route>

          <Route exact path={AppRout.FILMS}
            render={(props) => (
              <MoviePage
                {...this.props}
                match={props.match}
                authorizationStatus={authorizationStatus}
              />
            )}
          />

          <Route exact path={AppRout.PLAYER}
            render={(props) => (
              <BigVideoPlayerWrapped
                match={props.match}
                activeCardForPlayer={activeCardForPlayer}
              />
            )}
          />

          <PrivateRoute
            exact
            path={AppRout.MY_LIST}
            authorizationStatus={authorizationStatus}
            render={() => {
              return (
                <Mylist />
              );
            }}
          />

        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  onGenreClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  promoMovie: FilmPropTypes
};

const mapStateToProps = (state) => {
  return {
    promoMovie: getPromoMovie(state),
    authorizationStatus: getAuthorizationStatus(state),
  };
};

const mapDispatchToPtops = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.activeGenre(genre));
  },
  login(userData) {
    dispatch(UserOperation.login(userData));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToPtops)(App);
