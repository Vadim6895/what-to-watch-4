import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getFavorites} from "../../reducer/user/selectors.js";

import FilmList from "../film-list/film-list.jsx";
import withActivePlayer from "../../hocks/with-video-player.jsx";
const FilmListWrapped = withActivePlayer(FilmList);
import withFilmList from "../../hocks/with-film-list.jsx";
const FilmListSecondWrapped = withFilmList(FilmListWrapped);

import {AppRout} from "../..//const.js";

class MyList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadFavorites} = this.props;
    loadFavorites();
  }

  render() {
    const {favorites, onFilmClick} = this.props;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={AppRout.MAIN_PAGE} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">My list</h1>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__movies-list">
            <FilmListSecondWrapped filmCards={favorites} onFilmClick={onFilmClick} activeGenreCards={[]}/>
          </div>

        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRout.MAIN_PAGE} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

MyList.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({
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

  onFilmClick: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favorites: getFavorites(state),
});

const mapDispatchToPtops = (dispatch) => ({
  loadFavorites() {
    dispatch(UserOperation.loadFavorites());
  }
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToPtops)(MyList);
