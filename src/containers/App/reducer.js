import {
  ERROR,
  WARNING,
  SUCCESS,
  RESET_ALERTS,
} from "./constants";

const initialState = {
  success: false,
  warning: false,
  error: false,
  message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        success: true,
        message: action.message
      };
    case WARNING:
      return {
        ...initialState,
        warning: true,
        message: action.message
      };
    case ERROR:
      return {
        ...initialState,
        error: true,
        message: action.message
      };
    case RESET_ALERTS:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
