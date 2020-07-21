import React, {PureComponent} from "react";
import VideoPlayer from "../components/video-player/video-player.jsx";

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeFilm: -1,
      };
    }

    render() {
      return <Component
        {...this.props}
        renderPlayer={(id, previewSrc, moviePreview) => {
          return (
            <VideoPlayer
              previewSrc={previewSrc}
              moviePreview={moviePreview}
              onMouseEnter={() => {
                this.setState({activeFilm: id});
              }}
              onMouseLeave={() => {
                this.setState({activeFilm: -1});
              }}
              isPlaying={this.state.activeFilm === id}
            />
          );
        }}
      />;
    }
  }
  return WithActivePlayer;
};

export default withActivePlayer;
