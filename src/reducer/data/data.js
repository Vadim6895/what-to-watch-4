import {extend} from "../../utils.js";
import {URL} from "../../const.js";
import {parseFilmCard, parseFilmCards} from "../../adapters/filmCards.js";
import {parseReviews} from "../../adapters/reviews.js";

const initialState = {
  filmCards: [],
  promoMovie: {},
  reviews: [],
};

const ActionType = {
  LOAD_FILM_CARDS: `LOAD_FILM_CARDS`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  UPLOAD_REVIEWS: `UPLOAD_REVIEWS`,
  CHANGE_FAVORITE_FILM: `CHANGE_FAVORITE_FILM`,
  CHANGE_FAVORITE_FILM_AS_CARDS: `CHANGE_FAVORITE_FILM_AS_CARDS`,
};

const ActionCreator = {
  loadFilmCards: (filmCards) => {
    return {
      type: ActionType.LOAD_FILM_CARDS,
      filmCards,
    };
  },
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      reviews,
    };
  },
  loadPromoMovie: (promoMovie) => {
    return {
      type: ActionType.LOAD_PROMO_MOVIE,
      promoMovie,
    };
  },
  uploadReview: (review) => {
    return {
      type: ActionType.UPLOAD_REVIEWS,
      review,
    };
  },
  changeFavoriteFilm: (favorite) => {
    return {
      type: ActionType.CHANGE_FAVORITE_FILM,
      favorite,
    };
  },
  changeFavoriteFilmAsCards: (favorite) => {
    return {
      type: ActionType.CHANGE_FAVORITE_FILM_AS_CARDS,
      favorite,
    };
  }
};

const Operation = {
  loadFilmCards: () => (dispatch, getState, api) => {
    return api.get(URL.FILMS)
    .then((response) => {
      return parseFilmCards(response.data);
    })
    .then((response) => {
      dispatch(ActionCreator.loadFilmCards(response));
    });
  },
  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(URL.PROMO)
    .then((response) => {
      return parseFilmCard(response.data);
    })
    .then((response) => {
      dispatch(ActionCreator.loadPromoMovie(response));
    });
  },
  loadReviews: (movie) => (dispatch, getState, api) => {
    return api.get(URL.COMMENTS + movie.id)
    .then((response) => {
      return parseReviews(response.data);
    })
    .then((response) => {
      dispatch(ActionCreator.loadReviews(response));
    });
  },
  uploadReview: (movie, review) => (dispatch, getState, api) => {
    return api.post(URL.COMMENTS + movie.id, {
      rating: review.rating,
      comment: review.commentText,
    })
    .then((response) => {
      return parseReviews(response.data);
    });
  },
  uploadFavorite: (movie) => (dispatch, getState, api) => {
    const numberStatus = movie.isFavorite ? 0 : 1;
    return api.post(URL.FAVORITE + movie.id + `/${numberStatus}`, {
      isFavorite: movie.isFavorite
    })
    .then((response) => {
      return parseFilmCard(response.data);
    })
    .then((response) => {
      dispatch(ActionCreator.changeFavoriteFilm(response));
      dispatch(ActionCreator.changeFavoriteFilmAsCards(response));
    })
    .catch((err) => {
      if (!err.isAuthError) {
        throw err;
      }
    });
  },
  uploadFavoriteAsCards: (movie) => (dispatch, getState, api) => {
    const numberStatus = movie.isFavorite ? 0 : 1;
    return api.post(URL.FAVORITE + movie.id + `/${numberStatus}`, {
      isFavorite: movie.isFavorite
    })
    .then((response) => {
      return parseFilmCard(response.data);
    })
    .then((response) => {
      dispatch(ActionCreator.changeFavoriteFilmAsCards(response));
    })
    .catch((err) => {
      if (!err.isAuthError) {
        throw err;
      }
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILM_CARDS:
      return extend(state, {
        filmCards: action.filmCards,
      });
    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.promoMovie,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.reviews,
      });
    case ActionType.CHANGE_FAVORITE_FILM:
      return extend(state, {
        promoMovie: action.favorite,
      });
    case ActionType.CHANGE_FAVORITE_FILM_AS_CARDS:
      const promo = state.promoMovie;
      const newCards = [...state.filmCards];
      let newPromo = null;
      let actualIndex;
      state.filmCards.forEach((item, index) => {
        if (item.id === action.favorite.id) {
          actualIndex = index;
        }
        if (action.favorite.id === promo.id) {
          newPromo = action.favorite;
        }
      });
      newCards[actualIndex] = action.favorite;
      let newCardsWithNewKey = extend(state, {
        filmCards: newCards,
      });
      if (newPromo !== null) {
        let newPromoWithKey = extend(newCardsWithNewKey, {
          promoMovie: newPromo,
        });
        return newPromoWithKey;
      } else {
        return newCardsWithNewKey;
      }
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
