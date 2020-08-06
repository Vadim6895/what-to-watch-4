import React, {createRef} from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";

import AddReview from "./add-review.jsx";

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`,
  moviePoster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  moviePreview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  id: 0,
  director: `Anthony Mann`,
  actors: [`Anthony Mann`],
  rating: 9,
  ratingsQuantity: 250,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  length: 120,
  backgroundColor: `#ffffff`,
  backgroundImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  isFavorite: false,
  reviews: [],
}];

const ref = createRef();

it(`Should Add review In render correctly`, () => {
  const tree = renderer
  .create(
      <Router history={history}>
        <AddReview
          activeCard={filmCards[0]}
          isLoad={false}
          showError={``}
          formValid={false}
          changeTextHandler={() => {}}
          changeRatingHandler={() => {}}
          submitHandler={() => {}}
          formRef={ref}
        />
      </Router>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
