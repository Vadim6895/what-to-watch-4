
const parseFilmCards = (filmCardsRAW) => {
  const filmCards = filmCardsRAW.map((filmCard) => {
    let formatFilmCard = {
      id: filmCard.id,
      movieName: filmCard.name,
      productionDate: filmCard.released,
      genre: filmCard.genre,
      moviePoster: filmCard.preview_image,
      src: filmCard.video_link,
      director: filmCard.director,
      actors: filmCard.starring,
      rating: filmCard.rating,
      ratingsQuantity: filmCard.scores_count,
      description: filmCard.description,
      length: filmCard.run_time,
      reviews: {
        text: `asdasdasda`,
        rating: 10,
        name: `asdsadas`,
        date: new Date(109434763),
      },
    };
    return formatFilmCard;
  });

  return filmCards;
};

export {parseFilmCards};
