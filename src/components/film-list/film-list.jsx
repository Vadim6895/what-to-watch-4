import React, {PureComponent} from "react";
import FilmCard from "../film-card/film-card.jsx";
import PropTypes from "prop-types";

class FilmList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeFilm: -1
    };
  }

  render() {
    const {filmCards, btnHandler} = this.props;
    const cardsArr = filmCards.map((card, index) => {
      return (
        <FilmCard name={card.movieName} btnHandler={btnHandler}
          key={card.movieName + index.toString()} id={card.id} onMouseEnter={
            (id) => {
              this.setState({activeFilm: id});
            }
          }
        />
      );
    });
    return cardsArr;
  }
}

FilmList.propTypes = {
  filmCards: PropTypes.array.isRequired,
  btnHandler: PropTypes.func.isRequired
};
export default FilmList;
