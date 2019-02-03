import {
  ERROR,
  WARNING,
  SUCCESS,
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
    default:
      return state;
  }
};
