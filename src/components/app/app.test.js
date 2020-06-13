import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`Render App`, () => {
  const tree = renderer
  .create(<App
    productionDate={`1984`}
    movieName={`The Grand Budapest Hotel`}
    genre={`Drama`}
    movieNames={[`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`]}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
