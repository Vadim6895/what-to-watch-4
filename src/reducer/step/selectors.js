import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.STEP;

export const getSelectedFilmId = (state) => {
  return state[NAME_SPACE].selectedFilmId;
};

export const getbigPlayerValue = (state) => {
  return state[NAME_SPACE].bigPlayerValue;
};

export const getActiveGenre = (state) => {
  return state[NAME_SPACE].activeGenre;
};
