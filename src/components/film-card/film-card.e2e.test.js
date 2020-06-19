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
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  id: 0
}];


it(`Should welcome button be pressed`, () => {
  const btnClickHandler = jest.fn();
  const onEnter = jest.fn();
  const getId = jest.fn();

  const filmCard = shallow(
      <FilmCard
        name={filmCards[0].movieName}
        id={filmCards[0].id}
        onMouseEnter={onEnter}
        btnHandler={btnClickHandler}
        poster={filmCards[0].poster}
        getIdCard={getId}
      />
  );

  const btnHandler = filmCard.find(`.small-movie-card__link`);

  // btnHandler.forEach((item) => item.props().onClick());
  btnHandler.props().onClick();
  expect(btnClickHandler.mock.calls.length).toBe(1);


  const smallCard = filmCard.find(`.small-movie-card`);
  smallCard.props().onMouseEnter();
  // expect(onEnter.mock.calls.length).toBe(1);
  expect(onEnter).toHaveBeenCalledWith(filmCards[0].id);

  btnHandler.props().onClick();
  expect(getId).toHaveBeenCalledWith(filmCards[0].id);
});
