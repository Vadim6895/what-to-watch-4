import {AuthorizationStatus} from "../../const.js";
import {parseFilmCards} from "../../adapters/filmCards.js";
import {extend} from "../../utils.js";
import {URL} from "../../const.js";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  favorites: [],
  avatar: ``,
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  LOAD_AVATAR: `LOAD_AVATAR`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      authorizationStatus: status,
    };
  },
  loadFavorites: (favorites) => {
    return {
      type: ActionType.LOAD_FAVORITES,
      favorites,
    };
  },
  loadAvatar: (avatar) => {
    return {
      type: ActionType.LOAD_AVATAR,
      avatar,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.authorizationStatus
      });
    case ActionType.LOAD_FAVORITES:
      return extend(state, {
        favorites: action.favorites
      });
    case ActionType.LOAD_AVATAR:
      return extend(state, {
        avatar: action.avatar
      });
  }
  return state;
};
// ---------------------------------------
const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(URL.LOGIN)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(URL.LOGIN, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.loadAvatar(response.data.avatar_url));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      });
  },
  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(URL.FAVORITE)
    .then((response) => {
      return parseFilmCards(response.data);
    })
    .then((response) => {
      dispatch(ActionCreator.loadFavorites(response));
      return response;
    });
  },
};

export {reducer, ActionType, ActionCreator, Operation};
