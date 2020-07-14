import React, {PureComponent} from "react";
// import BigVideoPlayer from "../components/big-video-player/big-video-player.jsx";

const withBigPlayer = (Component) => {
  class WithBigPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        play: false,
        fullscreen: false,
        progress: 0,
      };
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
        changeProgress={(value) => {
          this.setState({progress: value});
        }}
        progress={this.state.progress}
      />;
    }
  }
  return WithBigPlayer;
};

export default withBigPlayer;
