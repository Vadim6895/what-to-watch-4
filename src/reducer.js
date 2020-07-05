import {extend} from "./utils.js";
import {ALL_GENRES} from "./const.js";

const initialState = {
  // step: -1,
  selectedFilmId: -1,
  activeGenre: ALL_GENRES,
};

const ActionType = {
  STEP_ON_CARD: `STEP_ON_CARD`,
  ACTIVE_GENRE: `ACTIVE_GENRE`,
};

const actionSelectedFilmCreator = (id) => {
  return {
    type: ActionType.STEP_ON_CARD,
    // step: id,
    selectedFilmId: id
  };
};

const actionGenreCreator = (genre) => {
  return {
    type: ActionType.ACTIVE_GENRE,
    // step: -1,
    activeGenre: genre
  };
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.STEP_ON_CARD:
      return extend(state, {
        // step: action.step,
        selectedFilmId: action.selectedFilmId
      });
    case ActionType.ACTIVE_GENRE:
      return extend(state, {
        // step: action.step,
        // selectedFilmId: action.selectedFilmId,
        activeGenre: action.activeGenre,
      });
  }
  return state;
};

export {reducer, ActionType, actionSelectedFilmCreator, actionGenreCreator};
