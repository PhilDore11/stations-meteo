import {
  LOGOUT,
  ERROR,
  WARNING,
  SUCCESS,
  RESET_ALERTS,
  FETCH_CLIENT_STATIONS,
  FETCH_CLIENT_STATIONS_SUCCESS,
  FETCH_CLIENT_STATIONS_ERROR,
} from '../constants';

const initialState = {
  success: false,
  warning: false,
  error: false,
  message: '',
  clientStations: [],
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
    case FETCH_CLIENT_STATIONS:
      return {
        loading: true,
        ...state,
      };
    case FETCH_CLIENT_STATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        clientStations: action.res,
      };
    case FETCH_CLIENT_STATIONS_ERROR:
      return {
        loading: false,
        error: true,
        ...state,
      };
    default:
      return state;
  }
};
