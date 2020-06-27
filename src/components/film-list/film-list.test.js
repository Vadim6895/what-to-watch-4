import React from "react";
import renderer from "react-test-renderer";
import FilmList from "./film-list.jsx";

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`,
  moviePoster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  id: 0
}];

it(`Should FilmList render correctly`, () => {
  const tree = renderer
  .create(<FilmList
    filmCards={filmCards}
    onFilmClick={() => {}}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
