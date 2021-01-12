import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";

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

jest.useFakeTimers();
it(`Should video player on onMouseEnter`, () => {
  const mouseEnterFunc = jest.fn();
  const onMouseLeaveFunc = jest.fn();

  const videoPlayer = shallow(
      <VideoPlayer
        previewSrc={filmCards[0].previewSrc}
        moviePreview={filmCards[0].moviePreview}
        onMouseEnter={mouseEnterFunc}
        onMouseLeave={onMouseLeaveFunc}
        isPlaying={false}
      />
  );


  const smallMoviePlayerHandler = videoPlayer.find(`.small-movie-player`);
  smallMoviePlayerHandler.props().onMouseEnter();
  jest.runAllTimers();
  expect(mouseEnterFunc.mock.calls.length).toBe(1);

  smallMoviePlayerHandler.props().onMouseLeave();
  expect(onMouseLeaveFunc.mock.calls.length).toBe(1);
});
