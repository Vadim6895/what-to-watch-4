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
  // const btnClickHandler = jest.fn();
  // const onEnter = jest.fn();
  const filmClick = jest.fn();

  const filmCard = shallow(
      <FilmCard
        name={filmCards[0].movieName}
        id={filmCards[0].id}
        moviePoster={filmCards[0].moviePoster}
        onFilmClick={filmClick}
        src={filmCards[0].src}
        key={filmCards[0].movieName}
        renderPlayer={() => {}}
      />
  );

  // const btnHandler = filmCard.find(`.small-movie-card__link`);

  // btnHandler.forEach((item) => item.props().onClick());
  // btnHandler.props().onClick();
  // expect(btnClickHandler.mock.calls.length).toBe(1);


  const smallCard = filmCard.find(`.small-movie-card`);
  // smallCard.props().onMouseEnter();
  // expect(onEnter.mock.calls.length).toBe(1);
  // expect(onEnter).toHaveBeenCalledWith(filmCards[0].id);

  smallCard.props().onClick();
  expect(filmClick).toHaveBeenCalledWith(filmCards[0].id);
});
