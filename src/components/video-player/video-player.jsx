import React, {PureComponent, createRef} from "react";
// import PropTypes from "prop-types";

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isPlaying: false,
    };

    this._videoRef = createRef();
  }

  componentDidMount() {
    // const video = this._videoRef.current;

    /* video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };*/
  }


  render() {
    const {isLoading, isPlaying} = this.state;

    const {src, moviePoster, onMouseEnter, oN} = this.props;
    const get = () => {
      oN();
    };
    return (
      <video width="280" height="175" poster={moviePoster} onMouseEnter={() => this.setState({isPlaying: true})} controls="controls" ref={this._videoRef}>
        <source src={src} />
      </video>
    );
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.onplay = null;
    video.onpause = null;
    video.src = ``;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    console.log(video);
    if (this.state.isPlaying) {
      video.volume = 0.0;
      video.play();
    } else {
      video.pause();
    }
  }

}
