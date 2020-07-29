import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {MIN_TEXT_LENGTH, MAX_TEXT_LENGTH} from "../const.js";

import {Operation as DataOperation} from "../reducer/data/data.js";
import store from "../reducer/store.js";

const withAddReview = (Component) => {
  class WithAddReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        commentText: ``,
        isLoad: false,
        showError: ``,
      };
    }

    // -----------------------------------
    _changeRatingValue(value) {
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
    }
    // -----------------------------------

    render() {
      return <Component
        {...this.props}
        rating={this.state.activeItem}
        commentText={this.state.commentText}
        isLoad={this.state.isLoad}
        showError={this.state.showError}
        formValid={this._isFormValid(this.state.rating, this.state.commentText)}
        changeText={(evt) => this._changeText(evt)}
        changeRating={(value) => this._changeRatingValue(value)}
        submitHandler={(evt) => this._onSubmit(evt)}
      />;
    }
  }
  WithAddReview.propTypes = {
    filmCard: PropTypes.object.isRequired,
  };
  return WithAddReview;
};

export default withAddReview;
