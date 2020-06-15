import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MainPage from "./main-page.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should welcome button be pressed`, () => {
  const btnClickHandler = jest.fn();

  const mainPage = shallow(
      <MainPage
        productionDate={`1984`}
        movieName={`The Grand Budapest Hotel`}
        genre={`Drama`}
        movieNames={[`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`]}
        btnClickHandler={btnClickHandler}
      />
  );

  const btnHandler = mainPage.find(`.small-movie-card__link`);

  // btnHandler.props().onClick();
  btnHandler.forEach((item) => item.props().onClick());
  expect(btnClickHandler.mock.calls.length).toBe(3);
});
