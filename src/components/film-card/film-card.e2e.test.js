import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`,
  moviePoster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  moviePreview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  id: 0,
  director: `Anthony Mann`,
  actors: [`Anthony Mann`],
  rating: 9,
  ratingsQuantity: 250,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  length: 120,
  backgroundColor: `#ffffff`,
  backgroundImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  isFavorite: false,
  reviews: [],
}];


it(`Should FilmCard component click it correctly`, () => {
  const filmClick = jest.fn();

  const filmCard = shallow(
      <FilmCard
        name={filmCards[0].movieName}
        id={filmCards[0].id}
        moviePreview={filmCards[0].moviePreview}
        onFilmClick={filmClick}
        previewSrc={filmCards[0].previewSrc}
        renderPlayer={() => {}}
      />
  );

  const smallCard = filmCard.find(`.small-movie-card`);

  smallCard.props().onClick();
  expect(filmClick).toHaveBeenCalledWith(filmCards[0].id);
});
