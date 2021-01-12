import React from "react";
import renderer from "react-test-renderer";
import LoadingScreen from "./loading-screen.jsx";

it(`Should ErrorScreen render correctly`, () => {
  const tree = renderer
  .create(
      <LoadingScreen/>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
