import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tabs from "./tabs.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const reviews = [{
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem
   ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  date: new Date(),
  id: 1,
  rating: 8,
  name: {
    id: 1,
    name: `Anthony Mann`,
  }
}];

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: 1984,
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
  reviews,
}];

it(`Click tabs it correctly`, () => {
  // const mainNavLink = jest.fn();

  const tabs = shallow(
      <Tabs
        activeCard={filmCards[0]}
        activeItem={``}
        onItemClick={() => {}}
        reviews={reviews}
      />
  );

  const mainNavHandler = tabs.find(`.movie-nav__item`);

  mainNavHandler.forEach((item) => item.simulate(`click`, {target: {textContent: `Review`}}));
  // mainNavHandler.simulate(`click`);
  // tabs.update();
  // expect(mainNavLink.mock.calls.length).toBe(1);
  // expect(mainNavHandler.mock.calls.length).toBe(1);
});
