import React from "react";
import renderer from "react-test-renderer";
import FilmList from "./film-list.jsx";

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`,
  id: 0
}];

it(`Should FilmList render correctly`, () => {
  const tree = renderer
  .create(<FilmList
    filmCards={filmCards}
    btnHandler={() => {}}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
