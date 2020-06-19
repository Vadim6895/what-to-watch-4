import React from "react";
import renderer from "react-test-renderer";
import FilmList from "./film-list.jsx";

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  id: 0
}];

it(`Should FilmList render correctly`, () => {
  const tree = renderer
  .create(<FilmList
    filmCards={filmCards}
    btnHandler={() => {}}
    getIdCard={() => {}}
    poster={filmCards[0].poster}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
