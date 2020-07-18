import {extend} from "./utils.js";
import {filmCardsMock} from "./mocks/films.js";
import {parseFilmCards} from "./adapters/filmCards.js";
import {AuthorizationStatus} from "./const.js";

const initialState = {
  selectedFilmId: -1, // 1
  bigPlayerValue: false, // 1
  activeGenre: ``, // 1
  authorizationStatus: AuthorizationStatus.NO_AUTH, // 2 authorization
  filmCards: filmCardsMock, // 3 data
};

const ActionType = {
  STEP_ON_CARD: `STEP_ON_CARD`,
  ACTIVE_GENRE: `ACTIVE_GENRE`,
  PLAYER_VALUE: `PlAYER_VALUE`,
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  LOAD_FILM_CARDS: `LOAD_FILM_CARDS`,
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

const actionRequireAuthorizationCreator = (status) => {
  return {
    type: ActionType.REQUIRE_AUTHORIZATION,
    authorizationStatus: status,
  };
};

const actionLoadFilmCardsCreator = {
  loadFilmCards: (filmCards) => {
    return {
      type: ActionType.LOAD_FILM_CARDS,
      filmCards,
    };
  }
};

const Operation = {
  loadFilmCards: () => (dispatch, getState, api) => {
    return api.get(`/films`)
    .then((response) => {
      return parseFilmCards(response.data);
    })
    .then((response) => {
      dispatch(actionLoadFilmCardsCreator.loadFilmCards(response));
    });
  }
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
    case ActionType.REQUIRE_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.authorizationStatus
      });
    case ActionType.LOAD_FILM_CARDS:
      return extend(state, {
        filmCards: action.filmCards,
      });
  }
  return state;
};

export {reducer, ActionType, actionSelectedFilmCreator, actionPlayerCreator, actionGenreCreator,
  actionRequireAuthorizationCreator, AuthorizationStatus, actionLoadFilmCardsCreator, Operation};
