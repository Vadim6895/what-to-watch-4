import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {CARDS_COUNT} from "../const.js";

const withFilmList = (Component) => {
  class WithFilmList extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        step: 1,
        genreCards: this.props.activeGenreCards,
      };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.activeGenreCards !== prevState.genreCards) {
        return {
          step: 1,
          genreCards: nextProps.activeGenreCards,
        };
      }
      return null;
    }

    render() {
      const {activeGenreCards, filmCards} = this.props;

      let actualCards = filmCards;
      if (activeGenreCards.length) {
        actualCards = activeGenreCards;
      }

      let actualCardsCount = CARDS_COUNT * this.state.step;
      let newCards = actualCards.slice(0, actualCardsCount);

      return <Component
        {...this.props}
        onClick={() => this.setState({step: this.state.step + 1})}
        actualCardsCount={actualCardsCount}
        actualCards={actualCards}
        newCards={newCards}
      />;
    }
  }

  WithFilmList.propTypes = {
    activeGenreCards: PropTypes.array.isRequired,
    filmCards: PropTypes.array.isRequired,
  };

  return WithFilmList;
};

export default withFilmList;
