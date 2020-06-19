import React from "react";
import renderer from "react-test-renderer";
import MainPage from "./main-page.jsx";

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`,
  moviePoster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  id: 0
}];

it(`Should MainPage render correctly`, () => {
  const tree = renderer
  .create(<MainPage
    filmCards={filmCards}
    onFilmClick={() => {}}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
