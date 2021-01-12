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
      this._changeFullScreen = this._changeFullScreen.bind(this);
      this._changePlay = this._changePlay.bind(this);
      this._changeFullTime = this._changeFullTime.bind(this);
      this._changeTimeUpdate = this._changeTimeUpdate.bind(this);
    }

    _changeFullScreen() {
      const video = this.ref.current;
      if (!document.fullscreenElement) {
        this.setState({fullscreen: !this.state.fullscreen});
        video.controls = false;
      }
    }

    _changePlay() {
      const video = this.ref.current;
      this.setState({fullTime: video.duration});
    }

    _changeFullTime() {
      const video = this.ref.current;
      this.setState({fullTime: video.duration});
    }

    _changeTimeUpdate() {
      const video = this.ref.current;
      this.setState({progress: Math.floor(video.currentTime) * HUNDRED_FOR_PERCENT / this.state.fullTime});
    }

    componentDidMount() {
      const video = this.ref.current;

      video.addEventListener(`timeupdate`, this._changeTimeUpdate);
      document.addEventListener(`fullscreenchange`, this._changeFullScreen);
      video.addEventListener(`play`, this._changePlay);
      video.addEventListener(`loadedmetadata`, this._changeFullTime);
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

    componentWillUnmount() {
      const video = this.ref.current;
      video.removeEventListener(`timeupdate`, this._changeTimeUpdate);
      document.removeEventListener(`fullscreenchange`, this._changeFullScreen);
      video.removeEventListener(`play`, this._changePlay);
      video.removeEventListener(`loadedmetadata`, this._changeFullTime);

    }

    render() {
      return <Component
        {...this.props}
        play={this.state.play}
        fullscreen={this.state.fullscreen}
        playClickHandler={() => {
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
