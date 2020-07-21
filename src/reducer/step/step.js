import {extend} from "../../utils.js";

const initialState = {
  selectedFilmId: -1,
  bigPlayerValue: false,
  activeGenre: ``,
};

const ActionType = {
  STEP_ON_CARD: `STEP_ON_CARD`,
  ACTIVE_GENRE: `ACTIVE_GENRE`,
  PLAYER_VALUE: `PLAYER_VALUE`,
};

const ActionCreator = {
  selectedFilmId: (id) => {
    return {
      type: ActionType.STEP_ON_CARD,
      selectedFilmId: id,
    };
  },
  activeGenre: (genre) => {
    return {
      type: ActionType.ACTIVE_GENRE,
      activeGenre: genre,
    };
  },
  player: (value) => {
    return {
      type: ActionType.PLAYER_VALUE,
      bigPlayerValue: value,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.STEP_ON_CARD:
      return extend(state, {
        selectedFilmId: action.selectedFilmId
      });
    case ActionType.ACTIVE_GENRE:
      return extend(state, {
        activeGenre: action.activeGenre,
      });
    case ActionType.PLAYER_VALUE:
      return extend(state, {
        bigPlayerValue: action.bigPlayerValue
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
