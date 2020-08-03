import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {GenresList} from "./genres-list.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

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

const genres = [`Drama`, `fantasy`, `comedy`];

it(`Should genresList e2e be correctly`, () => {
  const itemClick = jest.fn();

  const genresList = shallow(
      <GenresList
        filmCards={filmCards}
        onGenreClick={itemClick}
        activeGenre={``}
        genres={genres}
      />
  );

  const genreButtonHandler = genresList.find(`.catalog__genres-item`);
  genreButtonHandler.forEach((item) => item.props().onClick({target: {textContent: `All genres`}}));
  expect(itemClick).toHaveBeenCalledWith(`All genres`);
});
