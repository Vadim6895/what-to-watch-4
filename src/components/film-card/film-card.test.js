import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`,
  id: 0
}];

it(`Should FilmCard render correctly`, () => {
  const tree = renderer
  .create(<FilmCard
    name={filmCards[0].movieName}
    id={filmCards[0].id}
    onMouseEnter={() => {}}
    btnHandler={() => {}}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
