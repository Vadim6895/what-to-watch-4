import NameSpace from "../name-space.js";


export const getAuthorizationStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

export const getFavorites = (state) => {
  return state[NameSpace.USER].favorites;
};
