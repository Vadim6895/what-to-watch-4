import {reducer, ActionType, actionSelectedFilmCreator, actionGenreCreator} from "./reducer.js"; // actionSelectedFilmCreator ActionType
import {ALL_GENRES, GenresMap} from "./const.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    selectedFilmId: -1,
    activeGenre: ALL_GENRES,
  });
});

it(`Reducer should increment current selectedFilmId by a given value`, () => {
  expect(reducer({
    selectedFilmId: -1,
    activeGenre: ALL_GENRES,
  }, {
    type: ActionType.STEP_ON_CARD,
    selectedFilmId: 1,
    activeGenre: ALL_GENRES,
  })).toEqual({
    selectedFilmId: 1,
    activeGenre: ALL_GENRES,
  });

  expect(reducer({
    selectedFilmId: -1,
    activeGenre: ALL_GENRES,
  }, {
    type: ActionType.STEP_ON_CARD,
    selectedFilmId: 2,
    activeGenre: ALL_GENRES,
  })).toEqual({
    selectedFilmId: 2,
    activeGenre: ALL_GENRES,
  });
});

it(`Reducer should increment number of activeGenre by a given value`, () => {
  expect(reducer({
    selectedFilmId: -1,
    activeGenre: ALL_GENRES,
  }, {
    type: ActionType.ACTIVE_GENRE,
    activeGenre: GenresMap.DRAMA,
  })).toEqual({
    selectedFilmId: -1,
    activeGenre: GenresMap.DRAMA,
  });

  expect(reducer({
    selectedFilmId: -1,
    activeGenre: ALL_GENRES,
  }, {
    type: ActionType.ACTIVE_GENRE,
    activeGenre: GenresMap.FANTASY,
  })).toEqual({
    selectedFilmId: -1,
    activeGenre: GenresMap.FANTASY,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing selectedFilmId returns correct action`, () => {
    expect(actionSelectedFilmCreator(1)).toEqual({
      type: ActionType.STEP_ON_CARD,
      selectedFilmId: 1,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change activeGenre returns correct action`, () => {
    expect(actionGenreCreator(GenresMap.COMEDY)).toEqual({
      type: ActionType.ACTIVE_GENRE,
      activeGenre: GenresMap.COMEDY,
    });
  });
});
