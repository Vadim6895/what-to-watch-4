import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRout} from "../../const.js";
import withSignIn from "../../hocks/with-sign-in.jsx";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {submitHandler, emailError, emailRef, passwordRef} = this.props;
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={AppRout.MAIN_PAGE} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={submitHandler}>
            {emailError ?
              <div className="sign-in__message">
                <p>Please enter a valid email address</p>
              </div>
              :
              null}
            <div className="sign-in__fields">
              <div className={emailError ? `sign-in__field sign-in__field--error` : `sign-in__field`}>
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={emailRef}/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={passwordRef}/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

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
    );
  }
}

SignIn.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  emailError: PropTypes.bool.isRequired,
  emailRef: PropTypes.object.isRequired,
  passwordRef: PropTypes.object.isRequired,
};

const SignInWrapped = withSignIn(SignIn);

export {SignIn};
export default SignInWrapped;
