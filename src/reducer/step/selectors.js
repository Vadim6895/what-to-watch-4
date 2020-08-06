import NameSpace from "../name-space.js";
import {MORE_LIKE_THIS_COUNT} from "../../const.js";
import {createSelector} from "reselect";

import {getFilmCards} from "../data/selectors.js";

export const getSelectedFilmId = (state) => {
  return state[NameSpace.STEP].selectedFilmId;
};

export const getbigPlayerValue = (state) => {
  return state[NameSpace.STEP].bigPlayerValue;
};

export const getActiveGenre = (state) => {
  return state[NameSpace.STEP].activeGenre;
};

export const getActiveCard = createSelector(
    getFilmCards,
    (state) => state[NameSpace.STEP].selectedFilmId,
    (filmCards, selectedFilmId) => {
      if (selectedFilmId !== -1) {
        let activeCard = filmCards.find((filmCard) => filmCard.id === selectedFilmId);
        return activeCard;
      }
      return {};
    }
);

export const getActiveCard2 = createSelector(
    getFilmCards,
    id,
    (filmCards, id) => {
      let activeCard = filmCards.find((filmCard) => filmCard.id === id);
      return activeCard;
    }
);

export const getGenresOfCards = createSelector(
    getFilmCards,
    (filmCards) => {
      let genres = [];
      filmCards.forEach((filmCard) => genres.push(filmCard.genre));
      let uniqueGenres = genres.filter((item, index) => genres.indexOf(item) === index);
      return uniqueGenres;
    }
);

export const getCardsOnGenre = createSelector(
    getActiveGenre,
    getFilmCards,
    (activeGenre, filmCards) => {
      if (activeGenre) {
        let genreCards = filmCards.filter((filmCard) => filmCard.genre === activeGenre);
        return genreCards;
      }
      return filmCards;
    }
);

export const getRelatedMovies = createSelector(
    getActiveCard,
    getFilmCards,
    (activeFilmCard, filmCards) => {
      let relatedMovies = [];
      filmCards.forEach((filmCard) => {
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
    }
);
