import {
  LOGOUT,
  FETCH_IDF_DATA,
  FETCH_IDF_DATA_SUCCESS,
  FETCH_IDF_DATA_ERROR,
  FETCH_IDF_STATION_DATA,
  FETCH_IDF_STATION_DATA_SUCCESS,
  FETCH_IDF_STATION_DATA_ERROR,
} from '../constants';

const initialState = {
  idfData: [],
  idfStationData: [],
  error: false,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...initialState,
      };
    case FETCH_IDF_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_IDF_DATA_SUCCESS:
      return {
        ...state,
        idfData: action.res,
      };
    case FETCH_IDF_DATA_ERROR:
      return {
        ...state,
      };
    case FETCH_IDF_STATION_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_IDF_STATION_DATA_SUCCESS:
      return {
        ...state,
        idfStationData: action.res,
        error: false,
        loading: false,
      };
    case FETCH_IDF_STATION_DATA_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};
