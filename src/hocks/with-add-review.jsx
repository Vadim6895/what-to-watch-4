import React, {PureComponent} from "react";
import {MIN_TEXT_LENGTH, MAX_TEXT_LENGTH} from "../const.js";


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

    _changeRatingValue(value) {
      this.setState({
        rating: value,
      });
    }

    _changeTextHandler(evt) {
      this.setState({commentText: evt.target.value});
    }

    _isFormValid(rating, commentText) {
      if (rating > 0 && commentText.length >= MIN_TEXT_LENGTH && commentText.length <= MAX_TEXT_LENGTH) {
        return true;
      }
      return false;
    }

    render() {
      return <Component
        {...this.props}
        rating={this.state.rating}
        commentText={this.state.commentText}
        isLoad={this.state.isLoad}
        showError={this.state.showError}
        formValid={this._isFormValid(this.state.rating, this.state.commentText)}
        changeTextHandler={(evt) => this._changeTextHandler(evt)}
        changeRatingHandler={(value) => this._changeRatingValue(value)}
        changeLoadValue={(value) => this.setState({isLoad: value})}
        changeShowErrorValue={(value) => this.setState({showError: value})}
      />;
    }
  }
  return WithAddReview;
};

export default withAddReview;
