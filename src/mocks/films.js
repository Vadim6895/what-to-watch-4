const CARDS_COUNT = 8;

const getArrayRandElement = (arr) => {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

const MOVIE_NAMES = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];
const PRODUCTION_DATE = [`1984`, `1999`, `2001`, `2003`, `2010`];
const GENRES = [`Drama`, `Vestern`, `Comedy`, `Fantasy`, `Animation`];
const MOVIE_POSTERS = [`img/fantastic-beasts-the-crimes-of-grindelwald.jpg`, `img/bohemian-rhapsody.jpg`, `img/macbeth.jpg`];
const MOVIE_SRC = [`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`];

const createFilmCard = (id) => {
  const filmCard = {
    movieName: getArrayRandElement(MOVIE_NAMES),
    productionDate: getArrayRandElement(PRODUCTION_DATE),
    genre: getArrayRandElement(GENRES),
    moviePoster: getArrayRandElement(MOVIE_POSTERS),
    src: getArrayRandElement(MOVIE_SRC),
    id
  };
  return filmCard;
};

let filmCardsMock = [];
for (let i = 0; i < CARDS_COUNT; i++) {
  filmCardsMock.push(createFilmCard(i));
}

export {filmCardsMock};
