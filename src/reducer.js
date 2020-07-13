import {extend} from "./utils.js";

const initialState = {
  selectedFilmId: -1,
  // activeGenre: ALL_GENRES,
};

const ActionType = {
  STEP_ON_CARD: `STEP_ON_CARD`,
  // ACTIVE_GENRE: `ACTIVE_GENRE`,
};

const actionSelectedFilmCreator = (id) => {
  return {
    type: ActionType.STEP_ON_CARD,
    selectedFilmId: id
  };
};

/* const actionGenreCreator = (genre) => {
  return {
    type: ActionType.ACTIVE_GENRE,
    activeGenre: genre
  };
};*/


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.STEP_ON_CARD:
      return extend(state, {
        // step: action.step,
        selectedFilmId: action.selectedFilmId
      });
    /* case ActionType.ACTIVE_GENRE:
      return extend(state, {
        // step: action.step,
        // selectedFilmId: action.selectedFilmId,
        activeGenre: action.activeGenre,
      });*/
  }
  return state;
};

export {reducer, ActionType, actionSelectedFilmCreator};
