import {MovieRatingMap, MovieRatingValueMap, VALUE_HOUR} from "./const.js";

export const getRangMovie = (rating) => {
  if (rating < MovieRatingValueMap.BAD) {
    return MovieRatingMap.BAD;
  }
  if (rating >= MovieRatingValueMap.BAD && rating <= MovieRatingValueMap.NORMAL) {
    return MovieRatingMap.NORMAL;
  }
  if (rating >= MovieRatingValueMap.NORMAL && rating <= MovieRatingValueMap.GOOD) {
    return MovieRatingMap.GOOD;
  }
  if (rating >= MovieRatingValueMap.GOOD && rating <= MovieRatingValueMap.VERY_GOOD) {
    return MovieRatingMap.VERY_GOOD;
  }
  if (rating >= MovieRatingValueMap.VERY_GOOD && rating <= MovieRatingValueMap.AWESOME) {
    return MovieRatingMap.AWESOME;
  }
  return undefined;
};

export const formatTimeLengthMovie = (value) => {
  let hours = 0;
  let minutes = 0;
  for (let i = 0; i < value; i++) {
    if (value >= VALUE_HOUR) {
      hours++;
      value -= VALUE_HOUR;
    } else {
      minutes = value;
      break;
    }
  }
  if (!hours && minutes) {
    return `${minutes}m`;
  }
  if (hours && !minutes) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}m`;
};

export const formatDate = (objDate) => {
  return `${objDate.toLocaleString(`en`, {month: `long`})} ${objDate.getMonth() + 1}, ${objDate.getFullYear()}`;
};

export const getRelatedMovies = (activeFilmCard, filmCardsArr) => {
  let relatedMovies = [];
  filmCardsArr.forEach((filmCard) => {
    if (filmCard.genre === activeFilmCard.genre) {
      relatedMovies.push(filmCard);
    }
  });
  relatedMovies.forEach((filmCard, index) => {
    if (filmCard.id === activeFilmCard.id) {
      relatedMovies.splice(index, 1);
    }
  });

  return relatedMovies;
};
// --------------module 5
export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getGenresOfCards = (filmCards) => {
  let genres = [];
  filmCards.forEach((filmCard) => genres.push(filmCard.genre));
  let uniqueGenres = genres.filter((item, index) => genres.indexOf(item) === index);
  return uniqueGenres;
};

export const getCardsOnGenre = (genre, filmCards) => {
  if (genre) {
    let genreCards = filmCards.filter((filmCard) => filmCard.genre === genre);
    return genreCards;
  }
  return filmCards;
};
