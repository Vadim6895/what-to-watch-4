const CARDS_COUNT = 50;

const getArrayRandElement = (arr) => {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};
const getRandomRaitingMovie = (min, max) => {
  let a = Math.random() * (max - min) + min;
  return a.toFixed(min);
};
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const MOVIE_NAMES = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];
const PRODUCTION_DATE = [`1984`, `1999`, `2001`, `2003`, `2010`];
const GENRES = [`Drama`, `Vestern`, `Comedy`, `Fantasy`, `Animation`];
const MOVIE_POSTERS = [`img/fantastic-beasts-the-crimes-of-grindelwald.jpg`, `img/bohemian-rhapsody.jpg`, `img/macbeth.jpg`];
const MOVIE_SRC = [`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`];
const NAMES = [`Anthony Mann`, `Anne Wigton`, `Richard Weil`, `Erich vonSe`, `Mary Beth`, `Dan Duryea`];
const ACTORS = [];
for (let i = 0; i < 3; i++) {
  ACTORS.push(getArrayRandElement(NAMES));
}
const DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed blandit, eros vel aliquam faucibus,`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`
];
const START_TIME = 1547010000000; // `10 January 2019 00:00 UTC`
const END_TIME = 1586735940000; // `12 aprel 2020 23:59 UTC`

const createReview = () => {
  const review = {
    text: getArrayRandElement(DESCRIPTION),
    rating: getRandomRaitingMovie(1, 10),
    name: getArrayRandElement(NAMES),
    date: new Date(getRandomInteger(START_TIME, END_TIME))
  };
  return review;
};

const getRandomReviewsArr = () => {
  let reviewArr = [];
  let temp = getRandomInteger(1, 6);
  if (temp) {
    for (let i = 0; i < temp; i++) {
      reviewArr.push(createReview());
    }
  }
  return reviewArr;
};

const createFilmCard = (id) => {
  const filmCard = {
    id,
    movieName: getArrayRandElement(MOVIE_NAMES),
    productionDate: getArrayRandElement(PRODUCTION_DATE),
    genre: getArrayRandElement(GENRES),
    moviePoster: getArrayRandElement(MOVIE_POSTERS),
    moviePreview: getArrayRandElement(MOVIE_POSTERS),
    src: getArrayRandElement(MOVIE_SRC),
    previewSrc: getArrayRandElement(MOVIE_SRC),
    director: getArrayRandElement(NAMES),
    actors: ACTORS,
    rating: getRandomRaitingMovie(1, 10),
    ratingsQuantity: getRandomInteger(1, 300),
    description: getArrayRandElement(DESCRIPTION),
    length: getRandomInteger(1, 200),
    reviews: getRandomReviewsArr()
  };
  return filmCard;
};

let filmCardsMock = [];
for (let i = 0; i < CARDS_COUNT; i++) {
  filmCardsMock.push(createFilmCard(i));
}

export {filmCardsMock};
