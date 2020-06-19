import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import MainPage from "../main-page/main-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";


class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
      selectedFilmId: -1,
    };
  }

  _renderMainScreen() {
    const {filmCards} = this.props;
    const {step} = this.state;

    if (step === -1) {
      return (
        <MainPage filmCards={filmCards}
          getIdCard={(id) => {
            this.setState({
              selectedFilmId: id,
            });
          }}
          btnClickHandler={() => {
            this.setState({
              step: 1,
            });
          }}
        />
      );
    }
    if (step === 1) {
      return (
        <MoviePage filmCards={filmCards} id={this.state.selectedFilmId}/>
      );
    }

    return null;
  }

  render() {
    // const {filmCards} = this.props;
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
  filmCards: PropTypes.array.isRequired
};

export default App;
