import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

export const getFilmCards = (state) => {
  return state[NAME_SPACE].filmCards;
};

export const getPromoMovie = (state) => {
  return state[NAME_SPACE].promoMovie;
};

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};
