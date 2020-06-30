import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {getRangMovie, formatTimeLengthMovie, formatDate} from "../../utils.js";

class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: 0
    };

  }

  _changeState(value) {
    this.setState({step: value});
  }

  _createReview(review, index) {
    return (
      <div className="review" key={index}>
        <blockquote className="review__quote">
          <p className="review__text">{review.text}</p>

          <footer className="review__details">
            <cite className="review__author">{review.name}</cite>
            <time className="review__date" dateTime="2015-11-18">{formatDate(review.date)}</time>
          </footer>
        </blockquote>

        <div className="review__rating">{review.rating}</div>
      </div>
    );
  }

  _createReviewsList(reviews) {
    const equalLength = Math.ceil(reviews.length / 2);
    const firstSegment = reviews.slice(0, equalLength);
    const secondSegment = reviews.slice(equalLength, reviews.length);

    return (
      <React.Fragment>
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            {firstSegment.map((review, index) => {
              return this._createReview(review, index + new Date());
            })}
          </div>

          <div className="movie-card__reviews-col">
            {secondSegment.map((review, index) => {
              return this._createReview(review, index + new Date());
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }

  _createMainNav() { // немогу понять как можно передавать activeLink ? что бы скрутить mainNav
    const activeLink = `movie-nav__item--active`;
    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className="movie-nav__item" onClick={this._changeState.bind(this, 0)}>
            <a href="#" className="movie-nav__link">Overview</a>
          </li>
          <li className="movie-nav__item" onClick={this._changeState.bind(this, 1)}>
            <a href="#" className="movie-nav__link">Details</a>
          </li>
          <li className="movie-nav__item" onClick={this._changeState.bind(this, 2)}>
            <a href="#" className="movie-nav__link">Reviews</a>
          </li>
        </ul>
      </nav>
    );
  }

  _renderTabs() {
    const {activeCard} = this.props;
    const {step} = this.state;
    if (step === 0) {
      return (
        <React.Fragment>
          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className="movie-nav__item movie-nav__item--active" onClick={this._changeState.bind(this, 0)}>
                  <a href="#" className="movie-nav__link">Overview</a>
                </li>
                <li className="movie-nav__item" onClick={this._changeState.bind(this, 1)}>
                  <a href="#" className="movie-nav__link">Details</a>
                </li>
                <li className="movie-nav__item" onClick={this._changeState.bind(this, 2)}>
                  <a href="#" className="movie-nav__link">Reviews</a>
                </li>
              </ul>
            </nav>

            <div className="movie-rating">
              <div className="movie-rating__score">{activeCard.rating}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{getRangMovie(activeCard.rating)}</span>
                <span className="movie-rating__count">{activeCard.ratingsQuantity} ratings</span>
              </p>
            </div>

            <div className="movie-card__text">
              <p>{activeCard.description}</p>

              <p className="movie-card__director"><strong>Director: {activeCard.director}</strong></p>

              <p className="movie-card__starring"><strong>Starring: {activeCard.actors.join(`, `)}</strong></p>
            </div>
          </div>
        </React.Fragment>
      );
    }
    if (step === 1) {
      return (
        <React.Fragment>
          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className="movie-nav__item" onClick={this._changeState.bind(this, 0)}>
                  <a href="#" className="movie-nav__link">Overview</a>
                </li>
                <li className="movie-nav__item movie-nav__item--active" onClick={this._changeState.bind(this, 1)}>
                  <a href="#" className="movie-nav__link">Details</a>
                </li>
                <li className="movie-nav__item" onClick={this._changeState.bind(this, 2)}>
                  <a href="#" className="movie-nav__link">Reviews</a>
                </li>
              </ul>
            </nav>

            <div className="movie-card__text movie-card__row">
              <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Director</strong>
                  <span className="movie-card__details-value">{activeCard.director}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Starring</strong>
                  <span className="movie-card__details-value">

                    {activeCard.actors.map((actor, index) => {
                      return <span key={index}>{actor}{`,`}<br/></span>;
                    })}

                  </span>
                </p>
              </div>

              <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Run Time</strong>
                  <span className="movie-card__details-value">{formatTimeLengthMovie(activeCard.length)}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Genre</strong>
                  <span className="movie-card__details-value">{activeCard.genre}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Released</strong>
                  <span className="movie-card__details-value">{activeCard.productionDate}</span>
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    if (step === 2) {
      return (
        <React.Fragment>
          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className="movie-nav__item" onClick={this._changeState.bind(this, 0)}>
                  <a href="#" className="movie-nav__link">Overview</a>
                </li>
                <li className="movie-nav__item" onClick={this._changeState.bind(this, 1)}>
                  <a href="#" className="movie-nav__link">Details</a>
                </li>
                <li className="movie-nav__item movie-nav__item--active" onClick={this._changeState.bind(this, 2)}>
                  <a href="#" className="movie-nav__link">Reviews</a>
                </li>
              </ul>
            </nav>
            {this._createReviewsList(activeCard.reviews)}
          </div>
        </React.Fragment>
      );
    }
    return null;
  }

  render() {
    return this._renderTabs();
  }
}

export default Tabs;
