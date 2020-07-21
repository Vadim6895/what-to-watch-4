
const parseFilmCard = (filmCardRAW) => ({
  id: filmCardRAW.id,
  movieName: filmCardRAW.name,
  productionDate: filmCardRAW.released,
  genre: filmCardRAW.genre,
  moviePoster: filmCardRAW.poster_image,
  moviePreview: filmCardRAW.preview_image,
  previewSrc: filmCardRAW.preview_video_link,
  src: filmCardRAW.video_link,
  director: filmCardRAW.director,
  actors: filmCardRAW.starring,
  rating: filmCardRAW.rating,
  ratingsQuantity: filmCardRAW.scores_count,
  description: filmCardRAW.description,
  length: filmCardRAW.run_time,
  backgroundColor: filmCardRAW.background_color,
  backgroundImage: filmCardRAW.background_image,
  isFavorite: filmCardRAW.is_favorite,
  reviews: [],
});

const parseFilmCards = (filmCardsRAW) => {
  return filmCardsRAW.map(parseFilmCard);
};

export {parseFilmCard, parseFilmCards};
