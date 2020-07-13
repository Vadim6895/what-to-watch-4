import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import FilmList from "../film-list/film-list.jsx";

import withActivePlayer from "../../hocks/with-video-player.jsx";
const FilmListWrapped = withActivePlayer(FilmList);

import GenresList from "../genres-list/genres-list.jsx";
// ----------------------------------------------------------
import withFilmList from "../../hocks/with-film-list.jsx";
const FilmListSecondWrapped = withFilmList(FilmListWrapped);

import {getCardsOnGenre} from "../../utils.js";

class MainPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {filmCards, onFilmClick} = this.props;
    const {activeItem, onItemClick} = this.props;
    let activeGenreCards = getCardsOnGenre(activeItem, filmCards);

    return (
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{filmCards[0].movieName}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{filmCards[0].genre}</span>
                  <span className="movie-card__year">{filmCards[0].productionDate}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenresList filmCards={filmCards} onItemClick={onItemClick} activeItem={activeItem}/>

            <div className="catalog__movies-list">
              <FilmListSecondWrapped filmCards={filmCards} onFilmClick={onFilmClick} activeGenreCards={activeGenreCards}/>
            </div>

            <div className="catalog__more">
            </div>
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
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

// <FilmListWrapped filmCards={filmCards} onFilmClick={onFilmClick} activeGenreCards={activeGenreCards}/>
/* <div className="catalog__more">
  <button className="catalog__button" type="button">Show more</button>
</div>*/

MainPage.propTypes = {
  filmCards: PropTypes.array.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,

  // onGenreClick: PropTypes.func.isRequired,
  // activeGenreCards: PropTypes.array.isRequired,
  // activeGenre: PropTypes.string.isRequired,
};

export default MainPage;
