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
    const activeCard = filmCards.find((filmCard) => filmCard.id === this.state.selectedFilmId);

    if (step === -1) {
      return (
        <MainPage filmCards={filmCards}
          onFilmClick={(id) => {
            this.setState({
              selectedFilmId: id,
              step: 1,
            });
          }}
        />
      );
    }
    if (step === 1) {
      return (
        <MoviePage activeCard={activeCard}/>
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
  filmCards: PropTypes.array.isRequired
};

export default App;
