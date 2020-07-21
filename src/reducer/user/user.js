import {AuthorizationStatus} from "../../const.js";
import {extend} from "../../utils.js";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: () => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      authorizationStatus: status,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.authorizationStatus
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
