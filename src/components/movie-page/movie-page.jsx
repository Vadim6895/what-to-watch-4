import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";

import FilmList from "../film-list/film-list.jsx";
import withActivePlayer from "../../hocks/with-video-player.jsx";
const FilmListWrapped = withActivePlayer(FilmList);
import withFilmList from "../../hocks/with-film-list.jsx";
const FilmListSecondWrapped = withFilmList(FilmListWrapped);

import withActiveItem from "../../hocks/with-active-item.jsx";
const TabsWrapped = withActiveItem(Tabs);

import {connect} from "react-redux";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getReviews} from "../../reducer/data/selectors.js";
import store from "../../reducer/store.js";

import {Link} from "react-router-dom";
import {AuthorizationStatus, AppRout} from "../../const.js";

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {activeCard} = this.props;
    store.dispatch(DataOperation.loadReviews(activeCard));
  }

  componentDidUpdate(nextProps) {
    const {activeCard} = this.props;

    if (activeCard.id !== nextProps.activeCard.id) {
      store.dispatch(DataOperation.loadReviews(activeCard));
    }
  }

  render() {
    const {activeCard, reviews, authorizationStatus} = this.props;
    const {relatedMovies, onFilmClick} = this.props;
    const {handleAddList} = this.props;

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full" style={{background: activeCard.backgroundColor}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={activeCard.backgroundImage} alt={activeCard.movieName} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <Link to={AppRout.MAIN_PAGE} href="main.html" className="logo__link">
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
                      <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
                    </Link>
                    :
                    <Link to={AppRout.LOGIN} className="user-block__link">Sign in</Link>
                  }
                </div>
              </div>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{activeCard.movieName}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{activeCard.genre}</span>
                  <span className="movie-card__year">{activeCard.productionDate}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link to={`/bigPlayer/${activeCard.id}`} className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>
                  {activeCard.isFavorite ?
                    <button className="btn btn--list movie-card__button" type="button"
                      onClick={() => {
                        handleAddList(activeCard);
                      }}>
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                      <span>My list</span>
                    </button> :
                    <button className="btn btn--list movie-card__button" type="button"
                      onClick={() => {
                        handleAddList(activeCard);
                      }}>
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                    </button>}
                  {authorizationStatus === AuthorizationStatus.AUTH ?
                    <Link to={`/Review/${activeCard.id}`} className="btn movie-card__button">Add review</Link>
                    :
                    <Link to={AppRout.LOGIN} className="btn movie-card__button">Add review</Link>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={activeCard.moviePoster} alt={activeCard.movieName} width="218" height="327" />
              </div>
              <TabsWrapped activeCard={activeCard} reviews={reviews}/>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__movies-list">
              <FilmListSecondWrapped filmCards={relatedMovies} onFilmClick={onFilmClick} activeGenreCards={[]}/>
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

MoviePage.propTypes = {
  activeCard: PropTypes.object.isRequired,
  relatedMovies: PropTypes.array.isRequired,
  onFilmClick: PropTypes.func.isRequired,
  // onPlayerClick: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
  authorizationStatus: PropTypes.string.isRequired,

  handleAddList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
});

const mapDispatchToPtops = (dispatch) => ({
  handleAddList(activeCard) {
    dispatch(DataOperation.uploadFavoriteAsCards(activeCard));
  },
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToPtops)(MoviePage);
