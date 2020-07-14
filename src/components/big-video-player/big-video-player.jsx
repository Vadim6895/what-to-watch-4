import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {formatTimeLengthMovieInPlayer} from "../../utils.js";

class BigVideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
    this._duration = `00 : 00`;
  }

  _renderButtonPlayer(play, onPlayClick) {
    if (!play) {
      return (
        <button type="button" className="player__play" onClick={() => {
          onPlayClick();
        }}>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"></use>
          </svg>
          <span>Play</span>
        </button>
      );
    }
    return (
      <button type="button" className="player__play" onClick={() => {
        onPlayClick();
      }}>
        <svg viewBox="0 0 14 21" width="14" height="21">
          <use xlinkHref="#pause"></use>
        </svg>
        <span>Pause</span>
      </button>
    );
  }
  render() {
    const {onPlayerClick, activeCard} = this.props;
    const {onPlayClick, play} = this.props;
    const {onFullscreenClick, progress} = this.props;

    return (
      <div className="player">
        <video src={activeCard.src} className="player__video" poster="img/player-poster.jpg" ref={this._videoRef}></video>

        <button type="button" className="player__exit" onClick={() => {
          onPlayerClick(false);
        }}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progress} max="100"></progress>
              <div className="player__toggler" style={{left: progress + `%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{this._duration}</div>
          </div>

          <div className="player__controls-row">
            {this._renderButtonPlayer(play, onPlayClick)}
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen" onClick={() => {
              onFullscreenClick();
            }}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  /* componentDidMount() {
    const video = this._videoRef.current;
    video.ontimeupdate = () => this.setState({
      progress: Math.floor(video.currentTime),
    });
  }*/
  componentDidMount() {
    const video = this._videoRef.current;
    const {changeProgress} = this.props;

    video.ontimeupdate = () => {
      changeProgress(Math.floor(video.currentTime));
    };
  }

  componentDidUpdate(prevProps) {
    const video = this._videoRef.current;

    if (this.props.play) {
      this._duration = formatTimeLengthMovieInPlayer(video.duration);
      video.play();
    }
    if (!this.props.play) {
      video.pause();
    }

    if (prevProps.fullscreen !== this.props.fullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    }
  }
}

BigVideoPlayer.propTypes = {
  onPlayerClick: PropTypes.func.isRequired,
  activeCard: PropTypes.object.isRequired,
  play: PropTypes.bool.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  fullscreen: PropTypes.bool.isRequired,
  changeProgress: PropTypes.func.isRequired,
  onFullscreenClick: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
};

export default BigVideoPlayer;
