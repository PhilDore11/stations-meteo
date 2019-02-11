import {
  LOGOUT,
  ERROR,
  WARNING,
  SUCCESS,
  RESET_ALERTS,
  SET_STATION,
} from '../constants';

const initialState = {
  success: false,
  warning: false,
  error: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...initialState,
      };
    case SUCCESS:
      return {
        ...state,
        success: true,
        message: action.message,
      };
    case WARNING:
      return {
        ...initialState,
        warning: true,
        message: action.message,
      };
    case ERROR:
      return {
        ...initialState,
        error: true,
        message: action.message,
      };
    case RESET_ALERTS:
      return {
        ...initialState,
      };
    case SET_STATION:
      return {
        ...state,
        stationId: action.stationId,
      };
    default:
      return state;
  }
};
