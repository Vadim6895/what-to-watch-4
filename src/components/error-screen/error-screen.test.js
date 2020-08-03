import React from "react";
import renderer from "react-test-renderer";
import ErrorScreen from "./error-screen.jsx";

const errorText = `Error 401 unauthorized`;

it(`Should ErrorScreen render correctly`, () => {
  const tree = renderer
  .create(
      <ErrorScreen
        error={errorText}
      />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
