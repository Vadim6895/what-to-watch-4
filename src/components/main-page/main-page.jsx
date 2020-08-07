import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FilmList from "../film-list/film-list.jsx";
import withActivePlayer from "../../hocks/with-video-player.jsx";
const FilmListWrapped = withActivePlayer(FilmList);
import withFilmList from "../../hocks/with-film-list.jsx";
const FilmListSecondWrapped = withFilmList(FilmListWrapped);

import GenresList from "../genres-list/genres-list.jsx";
import {AuthorizationStatus, AppRout, LinkRout} from "../../const.js";
import {Link} from "react-router-dom";

import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getActiveGenre, getCardsOnGenre} from "../../reducer/step/selectors.js";
import {getFilmCards, getPromoMovie} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {FilmPropTypes} from "../../prop-types.js";

class MainPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {onGenreClick, activeGenreCards, activeGenre,
      authorizationStatus, filmCards, promoMovie} = this.props;
    const {handleAddList} = this.props;

    return (
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={promoMovie.backgroundImage} alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <header className={authorizationStatus === AuthorizationStatus.AUTH ?
            `page-header movie-card__head` : `page-header`}>
            <div className="logo">
              <Link to={AppRout.MAIN_PAGE} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="user-block">
              <div className={authorizationStatus === AuthorizationStatus.AUTH ?
                `user-block__avatar` : `user-block__link`}>
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <Link to={AppRout.MY_LIST}>
                    <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                  </Link>
                  :
                  <Link to={AppRout.LOGIN} className="user-block__link">Sign in</Link>
                }
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src={promoMovie.moviePoster} alt={promoMovie.movieName} width="218" height="327"/>
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{promoMovie.movieName}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{promoMovie.genre}</span>
                  <span className="movie-card__year">{promoMovie.productionDate}</span>
                </p>
                <div className="movie-card__buttons">
                  <Link to={LinkRout.PLAYER + `${promoMovie.id}`} className="btn btn--play movie-card__button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>
                  {promoMovie.isFavorite ?
                    <button className="btn btn--list movie-card__button" type="button"
                      onClick={() => {
                        handleAddList(promoMovie);
                      }}>
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                      <span>My list</span>
                    </button> :
                    <button className="btn btn--list movie-card__button" type="button"
                      onClick={() => {
                        handleAddList(promoMovie);
                      }}>
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                    </button>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <GenresList filmCards={filmCards}
              onGenreClick={onGenreClick}
              activeGenre={activeGenre}/>
            <div className="catalog__movies-list">
              <FilmListSecondWrapped
                filmCards={filmCards}
                activeGenreCards={activeGenreCards}/>
            </div>

            <div className="catalog__more">
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
      </React.Fragment>
    );
  }
}

MainPage.propTypes = {
  filmCards: PropTypes.arrayOf(FilmPropTypes),
  promoMovie: FilmPropTypes,
  onGenreClick: PropTypes.func.isRequired,
  activeGenreCards: PropTypes.arrayOf(FilmPropTypes),
  activeGenre: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  handleAddList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const filmCards = getFilmCards(state);
  const activeGenreCards = getCardsOnGenre(state);
  const promoMovie = getPromoMovie(state);
  return {
    filmCards,
    activeGenreCards,
    activeGenre: getActiveGenre(state),
    promoMovie,
    authorizationStatus: getAuthorizationStatus(state),
  };
};

const mapDispatchToPtops = (dispatch) => ({
  handleAddList(promoMovie) {
    dispatch(DataOperation.uploadFavorite(promoMovie));
  },
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToPtops)(MainPage);
