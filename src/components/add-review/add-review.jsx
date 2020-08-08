import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {AppRout, OPACITY_MAP_FOR_BTN} from "../../const.js";
import {getActiveCard} from "../../reducer/step/selectors.js";
import {LinkRout} from "../../const.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import store from "../../reducer/store.js";
import history from "../../history.js";
import {FilmPropTypes} from "../../prop-types.js";
import withAddReview from "../../hocks/with-add-review.jsx";

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.formRef = createRef();
  }

  _submitHandler(evt) {
    evt.preventDefault();
    const {activeCard, rating, commentText, changeLoadValue, changeShowErrorValue} = this.props;
    const form = this.formRef.current;
    changeLoadValue(true);
    store.dispatch(DataOperation.uploadReview(activeCard, {rating, commentText}))
        .then(() => {
          changeLoadValue(false);
          changeShowErrorValue(``);
          form.reset();
          history.push(LinkRout.FILMS + activeCard.id);
        })
        .catch((response) => {
          changeLoadValue(false);
          changeShowErrorValue(response.toString());
        });
  }

  _getStateBtn() {
    const {isLoad, formValid} = this.props;
    if (!isLoad && formValid) {
      return false;
    }
    return true;
  }

  render() {
    const {activeCard} = this.props;
    const {changeTextHandler, changeRatingHandler,
      isLoad, showError} = this.props;

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
          <form action="#" className="add-review__form" onSubmit={(evt) => this._submitHandler(evt)} disabled={isLoad} ref={this.formRef}>
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
                <button className="add-review__btn" type="submit" disabled = {this._getStateBtn()}
                  style={{opacity: this._getStateBtn() ? OPACITY_MAP_FOR_BTN.DISABLED : OPACITY_MAP_FOR_BTN.ENABLED}}>Post</button>
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
  rating: PropTypes.number.isRequired,
  commentText: PropTypes.string.isRequired,
  isLoad: PropTypes.bool.isRequired,
  showError: PropTypes.string.isRequired,
  formValid: PropTypes.bool.isRequired,
  changeTextHandler: PropTypes.func.isRequired,
  changeRatingHandler: PropTypes.func.isRequired,
  changeLoadValue: PropTypes.func.isRequired,
  changeShowErrorValue: PropTypes.func.isRequired,
  activeCard: FilmPropTypes
};

const mapStateToProps = (state, ownProps) => {
  const activeCard = getActiveCard(state, ownProps);

  return {
    activeCard,
  };
};

const AddReviewWrapped = withAddReview(AddReview);

export {AddReview};
export default connect(mapStateToProps)(AddReviewWrapped);
