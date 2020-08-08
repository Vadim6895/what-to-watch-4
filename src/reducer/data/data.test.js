import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";
import {parseFilmCards, parseFilmCard} from "../../adapters/filmCards.js";
import {parseReviews} from "../../adapters/reviews.js";
import {URL} from "../../const.js";

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

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    filmCards: [],
    promoMovie: {},
    reviews: [],
  });
});

it(`Reducer should update filmCards by load filmCards`, () => {
  expect(reducer({
    filmCards: [],
    promoMovie: {},
    reviews: [],
  }, {
    type: ActionType.LOAD_FILM_CARDS,
    filmCards,
    promoMovie: {},
    reviews: [],
  })).toEqual({
    filmCards,
    promoMovie: {},
    reviews: [],
  });
});

it(`Should correctly api call to data loadFilmCards`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const filmCardsLoader = Operation.loadFilmCards();

  const parsedCards = parseFilmCards(filmCardsRAW);

  apiMock
  .onGet(URL.FILMS)
  .reply(200, filmCardsRAW);

  return filmCardsLoader(dispatch, () => {}, api)
  .then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.LOAD_FILM_CARDS,
      filmCards: parsedCards,
    });
  });
});
// ------test PromoMovie -----------
it(`Reducer should update promoMovie by load promoMovie`, () => {
  expect(reducer({
    filmCards: [],
    promoMovie: {},
    reviews: [],
  }, {
    type: ActionType.LOAD_PROMO_MOVIE,
    filmCards: [],
    promoMovie: filmCards[0],
    reviews: [],
  })).toEqual({
    filmCards: [],
    promoMovie: filmCards[0],
    reviews: [],
  });
});

it(`Should correctly api call to data loadPromoMovie`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const filmCardsLoader = Operation.loadPromoMovie();

  const parsedCards = parseFilmCard(filmCardsRAW);

  apiMock
  .onGet(URL.PROMO)
  .reply(200, filmCardsRAW);

  return filmCardsLoader(dispatch, () => {}, api)
  .then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.LOAD_PROMO_MOVIE,
      promoMovie: parsedCards,
    });
  });
});
// --------- test Reviews --------------
const reviews = [{
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
  dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  date: new Date(),
  id: 1,
  rating: 8,
  name: {
    id: 1,
    name: `Anthony Mann`,
  }
}];

const reviewsRAW = [{
  comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
  dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  date: `2020-06-29T16:06:01.831Z`,
  id: 1,
  rating: 8,
  user: {
    id: 1,
    name: `Anthony Mann`,
  }
}];

it(`Reducer should update promoMovie by load reviews`, () => {
  expect(reducer({
    filmCards: [],
    promoMovie: {},
    reviews: [],
  }, {
    type: ActionType.LOAD_REVIEWS,
    filmCards: [],
    promoMovie: {},
    reviews,
  })).toEqual({
    filmCards: [],
    promoMovie: {},
    reviews,
  });
});

it(`Should correctly api call to data loadReviews`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const filmCardsLoader = Operation.loadReviews(filmCards[0]);

  const parsedReviews = parseReviews(reviewsRAW);

  apiMock
  .onGet(URL.COMMENTS + 1)
  .reply(200, reviewsRAW);

  return filmCardsLoader(dispatch, () => {}, api)
  .then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.LOAD_REVIEWS,
      reviews: parsedReviews,
    });
  });
});
// --------- test add fovorites cards ------------
it(`Should correctly api call to data uploadFavorite`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const filmCardLoader = Operation.uploadFavorite(filmCards[0]);

  const parsedCards = parseFilmCard(filmCardsRAW);

  apiMock
  .onPost(URL.FAVORITE + 1 + `/1`)
  .reply(200, filmCardsRAW);

  return filmCardLoader(dispatch, () => {}, api)
  .then(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.CHANGE_FAVORITE_FILM,
      favorite: parsedCards,
    });
  });
});

it(`Should correctly api call to data uploadFavorites As other cards`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const filmCardsLoader = Operation.uploadFavoriteAsCards(filmCards[0]);

  const parsedCards = parseFilmCard(filmCardsRAW);

  apiMock
  .onPost(URL.FAVORITE + 1 + `/1`)
  .reply(200, filmCardsRAW);

  return filmCardsLoader(dispatch, () => {}, api)
  .then(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.CHANGE_FAVORITE_FILM_AS_CARDS,
      favorite: parsedCards,
    });
  });
});
