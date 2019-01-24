import {
  FETCH_STATIONS_SUCCESS,
  FETCH_STATIONS_ERROR,
} from "./constants";

const initialState = {
  stations: [],
  stationsError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATIONS_SUCCESS:
      return {
        ...state,
        stations: action.res
      };
    case FETCH_STATIONS_ERROR:
      return {
        ...state,
        stationsError: action.error
      };
    default:
      return state;
  }
};
