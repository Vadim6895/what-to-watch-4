import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const withSignIn = (Component) => {
  class WithSignIn extends PureComponent {
    constructor(props) {
      super(props);

      this._emailRef = createRef();
      this._passwordRef = createRef();
      this._submitHandler = this._submitHandler.bind(this);

      this.state = {
        favoriteCards: [],
        emailError: false,
      };
    }

    _isEmailValid(email) {
      const regex = /^.+@.+\..+$/igm;
      if (regex.test(email)) {
        return true;
      }
      return false;
    }

    _submitHandler(evt) {
      const {onSubmit} = this.props;
      evt.preventDefault();
      if (this._isEmailValid(this._emailRef.current.value)) {
        onSubmit({
          login: this._emailRef.current.value,
          password: this._passwordRef.current.value,
        });
        this.setState({emailError: false});
      } else {
        this.setState({emailError: true});
      }
    }

    render() {
      return <Component
        {...this.props}
        submitHandler={(evt) => this._submitHandler(evt)}
        emailError={this.state.emailError}
        emailRef={this._emailRef}
        passwordRef={this._passwordRef}
      />;
    }
  }
  WithSignIn.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  return WithSignIn;
};

export default withSignIn;
