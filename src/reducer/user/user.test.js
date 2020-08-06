import {reducer, ActionType, ActionCreator, Operation} from "./user.js";
import {AuthorizationStatus} from "../../const.js";

import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {parseFilmCards} from "../../adapters/filmCards.js";


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    favorites: [],
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    favorites: [],
  }, {
    type: ActionType.REQUIRE_AUTHORIZATION,
    authorizationStatus: AuthorizationStatus.AUTH,
    favorites: [],
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    favorites: [],
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    favorites: [],
  }, {
    type: ActionType.REQUIRE_AUTHORIZATION,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    favorites: [],
    avatar: ``,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    favorites: [],
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    favorites: [],
  }, {
    type: ActionType.REQUIRE_AUTHORIZATION,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    favorites: [],
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    favorites: [],
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    favorites: [],
  }, {
    type: ActionType.REQUIRE_AUTHORIZATION,
    authorizationStatus: AuthorizationStatus.AUTH,
    favorites: [],
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    favorites: [],
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      authorizationStatus: AuthorizationStatus.AUTH,
    });
  });
});

// ------------ test loading favorites -------------
const api = createAPI(() => {});

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`,
  moviePoster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  moviePreview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  id: 1,
  director: `Anthony Mann`,
  actors: [`Anthony Mann`],
  rating: 9,
  ratingsQuantity: 250,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem
   ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  length: 120,
  backgroundColor: `#ffffff`,
  backgroundImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  isFavorite: false,
  reviews: [],
}];
/* eslint-disable */
const filmCardsRAW = [{
  background_color: `#ffffff`,
  background_image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem
   ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  director: `Anthony Mann`,
  genre: `Drama`,
  id: 1,
  is_favorite: false,
  name: `The Grand Budapest Hotel`,
  poster_image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview_image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: 9,
  released: `1984`,
  run_time: 165,
  scores_count: 250,
  starring: [`Anthony Mann`],
  video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
}];
/* eslint-enable */

it(`Reducer should update favorites by load favorites`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    favorites: [],
  }, {
    type: ActionType.LOAD_FAVORITES,
    authorizationStatus: AuthorizationStatus.AUTH,
    favorites: filmCards,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    favorites: filmCards,
  });
});

it(`Should correctly api call to data loadFavorites`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const filmCardsLoader = Operation.loadFavorites();

  const parsedCards = parseFilmCards(filmCardsRAW);

  apiMock
  .onGet(URL.FAVORITE)
  .reply(200, filmCardsRAW);

  return filmCardsLoader(dispatch, () => {}, api)
  .then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.LOAD_FAVORITES,
      favorites: parsedCards,
    });
  });
});
