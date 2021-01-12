import {reducer, ActionType, ActionCreator} from "./step.js";
import {GenresMap} from "../../const.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeGenre: ``,
  });
});

it(`Reducer should increment number of activeGenre by a given value`, () => {
  expect(reducer({
    activeGenre: ``,
  }, {
    type: ActionType.ACTIVE_GENRE,
    activeGenre: GenresMap.DRAMA,
  })).toEqual({
    activeGenre: GenresMap.DRAMA,
  });
  expect(reducer({
    activeGenre: ``,
  }, {
    type: ActionType.ACTIVE_GENRE,
    activeGenre: GenresMap.FANTASY,
  })).toEqual({
    activeGenre: GenresMap.FANTASY,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change activeGenre returns correct action`, () => {
    expect(ActionCreator.activeGenre(GenresMap.COMEDY)).toEqual({
      type: ActionType.ACTIVE_GENRE,
      activeGenre: GenresMap.COMEDY,
    });
  });
});
