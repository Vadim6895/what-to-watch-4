import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenresList from "./genres-list.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`,
  moviePoster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  id: 0,
  director: `Anthony Mann`,
  actors: [`Anthony Mann`],
  rating: 9,
  ratingsQuantity: 250,
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  length: 120,
  reviews: [{
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
    rating: 8,
    name: `Anthony Mann`,
    date: new Date(),
  }]
}];

it(`Should welcome button be pressed`, () => {
  const genreClick = jest.fn();

  const genresList = shallow(
      <GenresList
        filmCards={filmCards}
        onGenreClick={genreClick}
        activeGenre={filmCards[0].genre}
      />
  );

  const genreButtonHandler = genresList.find(`.catalog__genres-item`);
  genreButtonHandler.forEach((item) => item.props().onClick());
  expect(genreClick).toHaveBeenCalledWith(`All genres`);
});
