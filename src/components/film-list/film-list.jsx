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
    const {filmCards, onFilmClick} = this.props;

    const cardsArr = filmCards.map((filmCard, index) => {
      return (
        <FilmCard name={filmCard.movieName}
          onFilmClick={onFilmClick}
          moviePoster={filmCard.moviePoster}
          key={filmCard.movieName + index.toString()}
          id={filmCard.id}
          onMouseEnter={() => {
            this.setState({activeFilm: filmCard.id});
          }}
          onMouseLeave={() => {
            this.setState({activeFilm: -1});
          }}
          isPlaying={this.state.activeFilm === filmCard.id}

          src={filmCard.src}
        />
      );
    });
    return cardsArr;
  }

  componentWillUnmount() {
    this.setState({activeFilm: false});
  }
}

FilmList.propTypes = {
  filmCards: PropTypes.array.isRequired,
  onFilmClick: PropTypes.func.isRequired,
};
export default FilmList;
