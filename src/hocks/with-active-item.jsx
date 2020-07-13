import React, {PureComponent} from "react";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: ``
      };
    }

    render() {
      return <Component
        {...this.props}
        onItemClick={(activeItem) => this.setState({activeItem})}
        activeItem={this.state.activeItem}
      />;
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
