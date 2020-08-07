import PropTypes from "prop-types";

export const FilmPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  movieName: PropTypes.string.isRequired,
  productionDate: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  moviePoster: PropTypes.string.isRequired,
  moviePreview: PropTypes.string.isRequired,
  previewSrc: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  actors: PropTypes.array.isRequired,
  rating: PropTypes.number.isRequired,
  ratingsQuantity: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  reviews: PropTypes.array.isRequired,
}).isRequired;
