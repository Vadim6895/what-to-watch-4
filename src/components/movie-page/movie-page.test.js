import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  id: 0
}];

it(`Should MoviePage render correctly`, () => {
  const tree = renderer
  .create(<MoviePage
    filmCards={filmCards}
    id={filmCards[0].id}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
