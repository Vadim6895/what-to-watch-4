import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`,
  moviePoster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  id: 0,
  director: `Anthony Mann`,
  actors: [`Anthony Mann`],
  rating: 9,
  ratingsQuantity: 250,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  length: 120,
  reviews: [{
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
    rating: 8,
    name: `Anthony Mann`,
    date: new Date(),
  }]
}];

it(`Should MoviePage render correctly`, () => {
  const tree = renderer
  .create(<MoviePage
    activeCard={filmCards[0]}
    relatedMovies={filmCards.slice(0, 4)}
    onFilmClick={() => {}}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
