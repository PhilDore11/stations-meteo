import {
  LOGOUT,
  FETCH_STATION_DATA,
  FETCH_STATION_DATA_SUCCESS,
  FETCH_STATION_DATA_ERROR,
} from '../constants';

const initialState = {
  stationData: [],
  error: false,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...initialState,
      };
    case FETCH_STATION_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_STATION_DATA_SUCCESS:
      return {
        ...state,
        stationData: action.res,
        error: false,
        loading: false,
      };
    case FETCH_STATION_DATA_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};
