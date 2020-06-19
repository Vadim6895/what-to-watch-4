import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`,
  moviePoster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  id: 0
}];

it(`Should FilmCard render correctly`, () => {
  const tree = renderer
  .create(<FilmCard
    name={filmCards[0].movieName}
    id={filmCards[0].id}
    moviePoster={filmCards[0].moviePoster}
    onFilmClick={() => {}}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
