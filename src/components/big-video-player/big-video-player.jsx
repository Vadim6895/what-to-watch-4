import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import history from "../../history.js";

class BigVideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderButtonPlayer(play, playClickHandler) {
    if (!play) {
      return (
        <button type="button" className="player__play"
          onClick={() => {
            playClickHandler();
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
        playClickHandler();
      }}>
        <svg viewBox="0 0 14 21" width="14" height="21">
          <use xlinkHref="#pause"></use>
        </svg>
        <span>Pause</span>
      </button>
    );
  }
  render() {
    const {activeCard} = this.props;
    const {onFullscreenClick, progress, videoRef,
      currentTime, play, playClickHandler} = this.props;

    return (
      <div className="player">
        <video src={activeCard.src} className="player__video"
          poster="/img/player-poster.jpg" ref={videoRef}></video>

        <button type="button" className="player__exit" onClick={() => {
          history.goBack();
        }}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progress} max="100"></progress>
              <div className="player__toggler" style={{left: progress + `%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{currentTime}</div>
          </div>

          <div className="player__controls-row">
            {this._renderButtonPlayer(play, playClickHandler)}
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
}

BigVideoPlayer.propTypes = {
  activeCard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    movieName: PropTypes.string.isRequired,
    productionDate: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    moviePoster: PropTypes.string.isRequired,
    moviePreview: PropTypes.string.isRequired,
    previewSrc: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.array.isRequired,
    rating: PropTypes.number.isRequired,
    ratingsQuantity: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    reviews: PropTypes.array.isRequired,
  }).isRequired,
  play: PropTypes.bool.isRequired,
  playClickHandler: PropTypes.func.isRequired,
  fullscreen: PropTypes.bool.isRequired,
  onFullscreenClick: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  currentTime: PropTypes.string.isRequired,
  videoRef: PropTypes.object.isRequired,
};

export default BigVideoPlayer;
