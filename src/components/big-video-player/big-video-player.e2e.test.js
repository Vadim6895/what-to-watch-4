import React, {createRef} from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BigVideoPlayer from "./big-video-player.jsx";

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

const ref = createRef();

it(`Should BigVideoPlayer click it correctly`, () => {
  const playClick = jest.fn();
  const fullscreenClick = jest.fn();

  const bigVideoPlayer = shallow(
      <BigVideoPlayer
        activeCard={filmCards[0]}
        play={false}
        playClickHandler={playClick}
        fullscreen={false}
        onFullscreenClick={fullscreenClick}
        progress={0}
        currentTime={``}
        videoRef={ref}
      />
  );

  const playButton = bigVideoPlayer.find(`.player__play`);
  playButton.props().onClick();
  expect(playClick.mock.calls.length).toBe(1);

  const fullscreenButton = bigVideoPlayer.find(`.player__full-screen`);
  fullscreenButton.props().onClick();
  expect(fullscreenClick.mock.calls.length).toBe(1);
});
