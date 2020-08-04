import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";

const api = createAPI(() => {});

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
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem
   ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  length: 120,
  backgroundColor: `#ffffff`,
  backgroundImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  isFavorite: false,
  reviews: [],
}];

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

it(`Should correctly api call to data`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const filmCardsLoader = Operation.loadFilmCards();
  // apiMock.restore();
  // apiMock.reset();
  apiMock
  .onGet(`/films`)
  .reply(200, filmCards); // [{fake: true}]

  return filmCardsLoader(dispatch, () => {}, api)
  .then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(1, {
      type: ActionType.LOAD_FILM_CARDS,
      filmCards,
    });
  });
});
