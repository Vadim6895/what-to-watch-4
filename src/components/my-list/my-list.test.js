import React from "react";
import renderer from "react-test-renderer";
import {MyList} from "./my-list.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

it(`Should MyList render correctly`, () => {
  const tree = renderer
  .create(
      <Router history={history}>
        <MyList
          favorites={[]}
          onFilmClick={() => {}}
          loadFavorites={() => {}}
        />
      </Router>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
