import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRout, OPACITY_MAP_FOR_BTN} from "../../const.js";

class AddReview extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {activeCard} = this.props;
    const {formValid, changeTextHandler, changeRatingHandler, submitHandler,
      formRef, isLoad, showError} = this.props;

    return (
      <section className="movie-card movie-card--full" style={{background: activeCard.backgroundColor}}>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={activeCard.backgroundImage} alt={activeCard.movieName} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to={AppRout.MAIN_PAGE} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={AppRout.FILMS + activeCard.id} href="movie-page.html" className="breadcrumbs__link">{activeCard.movieName}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">
              <div className="user-block__avatar">
                <Link to={AppRout.MY_LIST}>
                  <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </Link>
              </div>
            </div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={activeCard.moviePoster} alt={activeCard.movieName} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={(evt) => submitHandler(evt)} disabled={isLoad} ref={formRef}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-0" type="radio" name="rating" value="0" defaultChecked="true" style={{display: `hidden`}}/>

                <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onClick={() => changeRatingHandler(1)}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onClick={() => changeRatingHandler(2)}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onClick={() => changeRatingHandler(3)}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onClick={() => changeRatingHandler(4)}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onClick={() => changeRatingHandler(5)}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
                onChange={(evt) => changeTextHandler(evt)}>
              </textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled = {!formValid}
                  style={{opacity: !formValid ? OPACITY_MAP_FOR_BTN.DISABLED : OPACITY_MAP_FOR_BTN.ENABLED}}>Post</button>
              </div>

            </div>
            <div>{showError ? showError : ``}</div>
          </form>
        </div>
      </section>
    );
  }
}

AddReview.propTypes = {
  activeCard: PropTypes.shape({
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
  }).isRequired,

  isLoad: PropTypes.bool.isRequired,
  showError: PropTypes.string.isRequired,
  formValid: PropTypes.bool.isRequired,
  changeTextHandler: PropTypes.func.isRequired,
  changeRatingHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  formRef: PropTypes.object.isRequired,
};

export default AddReview;
