import NameSpace from "../name-space.js";
import {MORE_LIKE_THIS_COUNT} from "../../const.js";

// export let activeCard = filmCards.find((filmCard) => filmCard.id === selectedFilmId);
export const getActiveCard = (filmCards, selectedFilmId) => {
  let activeCard = filmCards.find((filmCard) => filmCard.id === selectedFilmId);
  return activeCard;
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

  return relatedMovies.slice(0, MORE_LIKE_THIS_COUNT);
};

export const getSelectedFilmId = (state) => {
  return state[NameSpace.STEP].selectedFilmId;
};

export const getbigPlayerValue = (state) => {
  return state[NameSpace.STEP].bigPlayerValue;
};

export const getActiveGenre = (state) => {
  return state[NameSpace.STEP].activeGenre;
};
