import NameSpace from "../name-space.js";


export const getFilmCards = (state) => {
  return state[NameSpace.DATA].filmCards;
};

export const getPromoMovie = (state) => {
  return state[NameSpace.DATA].promoMovie;
};

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};
