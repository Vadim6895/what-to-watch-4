import React, {PureComponent, createRef} from "react";
import VideoPlayer from "../video-player/video-player.jsx";

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        withActivePlayerId: -1,
      }
    }

    render() {
      return <Component/>
    }
  }
};
