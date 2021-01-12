import {extend} from "../../utils.js";

const initialState = {
  activeGenre: ``,
};

const ActionType = {
  ACTIVE_GENRE: `ACTIVE_GENRE`,
};

const ActionCreator = {
  activeGenre: (genre) => {
    return {
      type: ActionType.ACTIVE_GENRE,
      activeGenre: genre,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ACTIVE_GENRE:
      return extend(state, {
        activeGenre: action.activeGenre,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
