import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tabs from "./tabs.jsx";

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


it(`Click tabs it correctly`, () => {
  // const mainNavLink = jest.fn();

  const tabs = shallow(
      <Tabs
        activeCard={filmCards[0]}
      />
  );

  const mainNavHandler = tabs.find(`.movie-nav__item`);

  mainNavHandler.forEach((item) => item.simulate(`click`));
  // mainNavHandler.simulate(`click`);
  // tabs.update();
  // expect(mainNavLink.mock.calls.length).toBe(1);
  expect(mainNavHandler.mock.calls.length).toBe(1);
});
