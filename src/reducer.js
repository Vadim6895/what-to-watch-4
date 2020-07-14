import {extend} from "./utils.js";

const initialState = {
  selectedFilmId: 0,
  bigPlayerValue: false,
  activeGenre: ``,
};

const ActionType = {
  STEP_ON_CARD: `STEP_ON_CARD`,
  ACTIVE_GENRE: `ACTIVE_GENRE`,
  PLAYER_VALUE: `PlAYER_VALUE`
};

const actionSelectedFilmCreator = (id) => {
  return {
    type: ActionType.STEP_ON_CARD,
    selectedFilmId: id
  };
};

const actionGenreCreator = (genre) => {
  return {
    type: ActionType.ACTIVE_GENRE,
    activeGenre: genre
  };
};

const actionPlayerCreator = (value) => {
  return {
    type: ActionType.PLAYER_VALUE,
    bigPlayerValue: value
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
    case ActionType.PLAYER_VALUE:
      return extend(state, {
        // step: action.step,
        // selectedFilmId: action.selectedFilmId,
        bigPlayerValue: action.bigPlayerValue
      });
  }
  return state;
};

export {reducer, ActionType, actionSelectedFilmCreator, actionPlayerCreator, actionGenreCreator};
