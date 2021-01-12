import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
    this.timerId = null;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.autoplay = false;
    video.src = ``;
    this._videoRef = ``;
    clearTimeout(this.timerId);
    this.timerId = ``;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    const {previewSrc} = this.props;

    if (this.props.isPlaying) {
      video.src = previewSrc;
      video.autoplay = true;
    } else {
      video.autoplay = false;
      video.src = ``;
    }
  }

  render() {
    const {moviePreview, onMouseEnter, onMouseLeave} = this.props;

    return (
      <video width="280" height="175" className="small-movie-player"
        poster={moviePreview}
        onMouseEnter={() => {
          this.timerId = setTimeout(onMouseEnter, 1000);
        }}
        onMouseLeave={() => {
          clearTimeout(this.timerId);
          onMouseLeave();
        }}
        muted
        ref={this._videoRef}>
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  previewSrc: PropTypes.string.isRequired,
  moviePreview: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};
