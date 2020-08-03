import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {Provider} from "react-redux";
import store from "../../reducer/store.js";

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

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

it(`Render App`, () => {
  const tree = renderer
  .create(
      <Provider store={store}>
        <App
          filmCards={filmCards}
          promoMovie={filmCards[0]}
          onFilmClick={() => {}}
          selectedFilmId={-1}
          bigPlayerValue={false}
          onPlayerClick={() => {}}
          onGenreClick={() => {}}
          activeGenre={filmCards[0].genre}

          authorizationStatus={AuthorizationStatus.NO_AUTH}
          login={() => {}}
          activeCard={filmCards[0]}
          activeGenreCards={filmCards}
          relatedMovies={filmCards}
        />
      </Provider>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
