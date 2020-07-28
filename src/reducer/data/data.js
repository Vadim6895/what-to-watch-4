import {extend} from "../../utils.js";
import {parseFilmCards, parseFilmCard} from "../../adapters/filmCards.js";
import {parseReviews} from "../../adapters/reviews.js";

// import {filmCardsMock} from "../../mocks/films.js";

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
  }
};

const Operation = {
  loadFilmCards: () => (dispatch, getState, api) => {
    return api.get(`/films`)
    .then((response) => {
      return parseFilmCards(response.data);
    })
    .then((response) => {
      dispatch(ActionCreator.loadFilmCards(response));
    });
  },
  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
    .then((response) => {
      return parseFilmCard(response.data);
    })
    .then((response) => {
      dispatch(ActionCreator.loadPromoMovie(response));
    });
  },
  loadReviews: (movie) => (dispatch, getState, api) => {
    return api.get(`/comments/${movie.id}`)
    .then((response) => {
      return parseReviews(response.data);
    })
    .then((response) => {
      dispatch(ActionCreator.loadReviews(response));
    });
  },
  uploadReview: (movie, review) => (dispatch, getState, api) => {
    return api.post(`/comments/${movie.id}`, {
      rating: review.rating,
      comment: review.text,
    })
    .then((response) => {
      return parseReviews(response.data);
    })
    .then((response) => {
      dispatch(ActionCreator.loadReviews(response));
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
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
