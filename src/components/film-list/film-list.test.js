import React from "react";
import renderer from "react-test-renderer";
import FilmList from "./film-list.jsx";

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
const CARDS_COUNT = 8;

it(`Should FilmList render correctly`, () => {
  const tree = renderer
  .create(<FilmList
    onFilmClick={() => {}}
    renderPlayer={() => {}}
    actualCardsCount={CARDS_COUNT}
    actualCards={filmCards.slice(0, 8)}
    newCards={filmCards.slice(0, 8)}
    onClick={() => {}}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
