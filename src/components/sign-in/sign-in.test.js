import React, {createRef} from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {SignIn} from "./sign-in.jsx";
import history from "../../history.js";

const ref = createRef();

it(`Should Sign In render correctly`, () => {
  const tree = renderer
  .create(
      <Router history={history}>
        <SignIn
          submitHandler={() => {}}
          emailError={false}
          emailRef={ref}
          passwordRef={ref}
        />
      </Router>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
