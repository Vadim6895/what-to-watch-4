import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MoviePage} from "./movie-page.jsx";

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
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing
   elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  length: 120,
  backgroundColor: `#ffffff`,
  backgroundImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  isFavorite: false,
  reviews: [],
}];

const reviews = [{
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem
   ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  rating: 8,
  name: `Anthony Mann`,
  date: new Date(),
}];

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

it(`Should moviePage e2e be correctly`, () => {
  const playerClick = jest.fn();

  const moviePage = shallow(
      <MoviePage
        activeCard={filmCards[0]}
        relatedMovies={filmCards.slice(0, 4)}
        onFilmClick={() => {}}
        onPlayerClick={playerClick}
        reviews={reviews}
        authorizationStatus={AuthorizationStatus.NO_AUTH}
      />
  );
  const playerButton = moviePage.find(`.btn--play`);
  playerButton.props().onClick();
  expect(playerClick.mock.calls.length).toBe(1);
});
