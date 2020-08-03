import React from "react";
import renderer from "react-test-renderer";
import MainPage from "./main-page.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";
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

it(`Should MainPage render correctly`, () => {
  const tree = renderer
  .create(
      <Provider store={store}>
        <Router history={history}>
          <MainPage
            filmCards={filmCards}
            promoMovie={filmCards[0]}
            onFilmClick={() => {}}
            onPlayerClick={() => {}}
            onGenreClick={() => {}}
            activeGenreCards={filmCards}
            activeGenre={filmCards[0].genre}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
          />
        </Router>
      </Provider>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
