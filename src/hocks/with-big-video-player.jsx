import React, {PureComponent, createRef} from "react";
import {formatTimeLengthMovieInPlayer} from "../utils.js";
import {HUNDRED_FOR_PERCENT} from "../const.js";

const withBigPlayer = (Component) => {
  class WithBigPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        play: false,
        fullscreen: false,
        progress: 0,
        fullTime: 0,
      };
      this.ref = createRef();
      this.currentTime = `0`;
    }

    componentDidMount() {
      const video = this.ref.current;

      video.ontimeupdate = () => {
        this.setState({progress: Math.floor(video.currentTime) * HUNDRED_FOR_PERCENT / this.state.fullTime});
      };

      document.addEventListener(`fullscreenchange`, () => {
        if (!document.fullscreenElement) {
          this.setState({fullscreen: !this.state.fullscreen});
          video.controls = false;
        }
      });

      video.addEventListener(`play`, () => {
        this.setState({play: true});
      });

      video.addEventListener(`loadedmetadata`, () => {
        this.setState({fullTime: video.duration});
      });
    }

    componentDidUpdate() {
      const video = this.ref.current;

      if (this.state.play) {
        this.currentTime = formatTimeLengthMovieInPlayer(video.currentTime);
        video.play();
      }
      if (!this.state.play) {
        video.pause();
      }
      if (this.state.fullscreen) {
        if (!document.fullscreenElement) {
          video.controls = false;
          video.requestFullscreen();
        }
      }
    }

    render() {
      return <Component
        {...this.props}
        play={this.state.play}
        fullscreen={this.state.fullscreen}
        onPlayClick={() => {
          this.setState({play: !this.state.play});
        }}
        onFullscreenClick={() => {
          this.setState({fullscreen: !this.state.fullscreen});
        }}

        progress={this.state.progress}
        videoRef={this.ref}
        currentTime={this.currentTime}
      />;
    }
  }
  return WithBigPlayer;
};

export default withBigPlayer;
