import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import history from "../../history.js";
import MainPage from "../main-page/main-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import AddReviewWrapped from "../add-review/add-review.jsx";
import Mylist from "../my-list/my-list.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import {AppRout} from "../../const.js";
import {ActionCreator} from "../../reducer/step/step.js";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getPromoMovie} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import BigVideoPlayerWrapped from "../big-video-player/big-video-player.jsx";
import SignInWrapped from "../sign-in/sign-in.jsx";
import {FilmPropTypes} from "../../prop-types.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {login, authorizationStatus, onGenreClick} = this.props;

    return (
      <Router history={history}>
        <Switch>

          <Route exact path={AppRout.MAIN_PAGE}>
            <MainPage
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
