import React, {PureComponent} from "react";
import PropTypes from "prop-types";
// import {MIN_TEXT_LENGTH, MAX_TEXT_LENGTH} from "../../const.js";

// import {Operation as DataOperation} from "../../reducer/data/data.js";
// import store from "../../reducer/store.js";

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    /* this.state = {
      rating: 0,
      commentText: ``,
      isLoad: false,
      showError: ``,
    };*/
  }

  /* _changeRatingValue(value) {
    this.setState({
      rating: value,
    });
  }

  _changeText(evt) {
    this.setState({commentText: evt.target.value});
  }

  _onSubmit(evt) {
    evt.preventDefault();
    const {filmCard} = this.props;

    store.dispatch(DataOperation.uploadReview(filmCard, {rating: this.state.rating, text: this.state.commentText}))
    .then(() => {
      this.setState({isLoad: true});
      this.setState({showError: ``});
    })
    .catch((response) => {
      this.setState({isLoad: false});
      this.setState({showError: response.toString()});
    });
  }

  _isFormValid(rating, commentText) {
    if (rating > 0 && commentText.length >= MIN_TEXT_LENGTH && commentText.length <= MAX_TEXT_LENGTH) {
      return true;
    }
    return false;
  }*/

  render() {
    const {filmCard} = this.props;
    // const {isLoad, showError} = this.state;
    const {isLoad, showError} = this.props; // hock
    // const formValid = this._isFormValid(this.state.rating, this.state.commentText);
    const {formValid, changeText, changeRating, submitHandler} = this.props;// hock

    return (
      <section className="movie-card movie-card--full" style={{background: filmCard.backgroundColor}}>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={filmCard.backgroundImage} alt={filmCard.movieName} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="movie-page.html" className="breadcrumbs__link">{filmCard.movieName}</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={filmCard.moviePoster} alt={filmCard.movieName} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={(evt) => submitHandler(evt)} disabled={isLoad}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-0" type="radio" name="rating" value="0" defaultChecked="true" style={{display: `hidden`}}/>

                <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onClick={() => changeRating(1)}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onClick={() => changeRating(2)}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onClick={() => changeRating(3)}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onClick={() => changeRating(4)}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onClick={() => changeRating(5)}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={(evt) => changeText(evt)}></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled = {!formValid} style={{opacity: !formValid ? `0.4` : `1`}}>Post</button>
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
  filmCard: PropTypes.object.isRequired,

  isLoad: PropTypes.bool.isRequired,
  showError: PropTypes.string.isRequired,
  formValid: PropTypes.bool.isRequired,
  changeText: PropTypes.func.isRequired,
  changeRating: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export default AddReview;
