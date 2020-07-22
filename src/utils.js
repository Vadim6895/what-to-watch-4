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

const prependZero = (value) => {
  let newValue = value;
  if (value < 10) {
    newValue = `0` + value;
  }
  return newValue;
};

export const formatTimeLengthMovieInPlayer = (value) => {
  let fixedValue = value.toFixed();
  let seconds = 0;
  let minutes = 0;
  for (let i = 0; i < fixedValue; i++) {
    if (fixedValue >= VALUE_HOUR) {
      seconds++;
      fixedValue -= VALUE_HOUR;
    } else {
      minutes = fixedValue;
      break;
    }
  }
  return `${prependZero(seconds)} : ${prependZero(minutes)}`;
};

export const formatDate = (objDate) => {
  return `${objDate.toLocaleString(`en`, {month: `long`})} ${objDate.getMonth() + 1}, ${objDate.getFullYear()}`;
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};
