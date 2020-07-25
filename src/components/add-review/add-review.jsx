import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {MIN_TEXT_LENGTH, MAX_TEXT_LENGTH} from "../../const.js";

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this._textAreaRef = createRef();
    this._submitBtnRef = createRef();

    this._changeRatingValue = this._changeRatingValue.bind(this);

    this.state = {
      isratingValue: 0,
      commentText: ``,
      isFormValid: false,
    };
  }

  _changeRatingValue(value) {
    this.setState({
      isratingValue: value,
    });
  }

  _changeText(evt) {
    if (evt.target.value.length > MIN_TEXT_LENGTH &&
    evt.target.value.length <= MAX_TEXT_LENGTH) {
      this.setState({commentText: evt.target.value});
    }
  }

  componentDidUpdate() {
    this.setState({isFormValid: this.state.isratingValue === 0 || this.state.commentText === `` ? false : true});
  }

  render() {
    const {filmCard} = this.props;
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
          <form action="#" className="add-review__form">
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"readOnly onClick={() => this._changeRatingValue(1)}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" readOnly onClick={() => this._changeRatingValue(2)}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" checked readOnly onClick={() => this._changeRatingValue(3)}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" readOnly onClick={() => this._changeRatingValue(4)}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" readOnly onClick={() => this._changeRatingValue(5)}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={(evt) => this._changeText(evt)}></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled = {!this.state.isFormValid}>Post</button>
              </div>

            </div>
          </form>
        </div>
      </section>
    );
  }
}

AddReview.propTypes = {
  filmCard: PropTypes.object.isRequired,
};

export default AddReview;
