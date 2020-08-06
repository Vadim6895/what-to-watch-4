import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MainPage} from "./main-page.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

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
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing
   elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum .`,
  length: 120,
  backgroundColor: `#ffffff`,
  backgroundImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  isFavorite: false,
  reviews: [],
}];

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

it(`Should MainPage e2e be correctly`, () => {
  const handleAddList = jest.fn();

  const mainPage = shallow(
      <MainPage
        filmCards={filmCards}
        promoMovie={filmCards[0]}
        onFilmClick={() => {}}
        handleAddList={handleAddList}
        onGenreClick={() => {}}
        activeGenreCards={filmCards}
        activeGenre={filmCards[0].genre}
        authorizationStatus={AuthorizationStatus.NO_AUTH}
      />
  );
  const addListButton = mainPage.find(`.btn--list`);
  addListButton.props().onClick();
  expect(handleAddList.mock.calls.length).toBe(1);
});
