import {reducer, ActionType, actionSelectedFilmCreator} from "./reducer.js";
import {AuthorizationStatus} from "./const.js";
import {filmCardsMock} from "./mocks/films.js";


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    selectedFilmId: -1,
    activeGenre: ``,
    bigPlayerValue: false,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    filmCards: filmCardsMock,
  });
});

it(`Reducer should increment current selectedFilmId by a given value`, () => {
  expect(reducer({
    selectedFilmId: -1,
    activeGenre: ``,
    bigPlayerValue: false,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    filmCards: filmCardsMock,
  }, {
    type: ActionType.STEP_ON_CARD,
    selectedFilmId: 1,
    activeGenre: ``,
    bigPlayerValue: false,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    filmCards: filmCardsMock,
  })).toEqual({
    selectedFilmId: 1,
    activeGenre: ``,
    bigPlayerValue: false,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    filmCards: filmCardsMock,
  });

  expect(reducer({
    selectedFilmId: -1,
    activeGenre: ``,
    bigPlayerValue: false,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    filmCards: filmCardsMock,
  }, {
    type: ActionType.STEP_ON_CARD,
    selectedFilmId: 2,
    activeGenre: ``,
    bigPlayerValue: false,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    filmCards: filmCardsMock,
  })).toEqual({
    selectedFilmId: 2,
    activeGenre: ``,
    bigPlayerValue: false,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    filmCards: filmCardsMock,
  });
});

/* it(`Reducer should increment number of activeGenre by a given value`, () => {
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
});*/

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing selectedFilmId returns correct action`, () => {
    expect(actionSelectedFilmCreator(1)).toEqual({
      type: ActionType.STEP_ON_CARD,
      selectedFilmId: 1,
    });
  });
});

/* describe(`Action creators work correctly`, () => {
  it(`Action creator for change activeGenre returns correct action`, () => {
    expect(actionGenreCreator(GenresMap.COMEDY)).toEqual({
      type: ActionType.ACTIVE_GENRE,
      activeGenre: GenresMap.COMEDY,
    });
  });
});*/
