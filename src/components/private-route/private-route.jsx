import React from "react";
import PropTypes from "prop-types";

// import {Link} from "react-router-dom";
import {Route, Redirect} from "react-router-dom";

import {AuthorizationStatus} from "../../const.js";

const PrivateRoute = (props) => {
  const {authorizationStatus, render, path} = props;

  return (
    <Route exact path={path}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH ? render() : <Redirect to="/login" />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
