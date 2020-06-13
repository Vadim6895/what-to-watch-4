import React from "react";
import renderer from "react-test-renderer";
import MainPage from "./main-page.jsx";

it(`Should MainPage render correctly`, () => {
  const tree = renderer
  .create(<MainPage
    productionDate={`1984`}
    movieName={`The Grand Budapest Hotel`}
    genre={`Drama`}
    movieNames={[`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`]}
    btnClickHandler={() => {}}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
