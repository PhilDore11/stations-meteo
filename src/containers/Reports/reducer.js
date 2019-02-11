import moment from 'moment';

import {
  LOGOUT,
  FETCH_CLIENT_STATIONS,
  FETCH_CLIENT_STATIONS_SUCCESS,
  FETCH_CLIENT_STATIONS_ERROR,
  FETCH_STATION_DATA,
  FETCH_STATION_DATA_SUCCESS,
  FETCH_STATION_DATA_ERROR,
  FETCH_IDF_DATA,
  FETCH_IDF_DATA_SUCCESS,
  FETCH_IDF_DATA_ERROR,
  FETCH_IDF_STATION_DATA,
  FETCH_IDF_STATION_DATA_SUCCESS,
  FETCH_IDF_STATION_DATA_ERROR,
  SET_YEAR,
  SET_MONTH,
} from '../constants';

const initialState = {
  year: moment().year(),
  month: moment().month(),
  stationData: [],
  idfData: [],
  idfStationData: [],
  clientStations: [],
  stationId: '',
  reportsError: false,
  reportsLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...initialState,
      };
    case FETCH_CLIENT_STATIONS:
      return {
        ...state,
        reportsLoading: true,
      };
    case FETCH_CLIENT_STATIONS_SUCCESS:
      return {
        ...state,
        reportsLoading: false,
        clientStations: action.res,
        stationId: action.res[0].stationId,
      };
    case FETCH_CLIENT_STATIONS_ERROR:
      return {
        ...state,
        reportsLoading: false,
        reportsError: true,
      };
    case FETCH_STATION_DATA:
      return {
        ...state,
        reportsLoading: true,
      };
    case FETCH_STATION_DATA_SUCCESS:
      return {
        ...state,
        stationData: action.res,
        reportsError: false,
        reportsLoading: false,
      };
    case FETCH_STATION_DATA_ERROR:
      return {
        ...state,
        reportsError: true,
        reportsLoading: false,
      };
    case FETCH_IDF_DATA:
      return {
        ...state,
        reportsLoading: true,
      };
    case FETCH_IDF_DATA_SUCCESS:
      return {
        ...state,
        idfData: action.res,
        reportsError: false,
        reportsLoading: false,
      };
    case FETCH_IDF_DATA_ERROR:
      return {
        ...state,
        reportsError: true,
        reportsLoading: false,
      };
    case FETCH_IDF_STATION_DATA:
      return {
        ...state,
        reportsLoading: true,
      };
    case FETCH_IDF_STATION_DATA_SUCCESS:
      return {
        ...state,
        idfStationData: action.res,
        reportsError: false,
        reportsLoading: false,
      };
    case FETCH_IDF_STATION_DATA_ERROR:
      return {
        ...state,
        reportsError: true,
        reportsLoading: false,
      };
    case SET_YEAR:
      return {
        ...state,
        year: action.year,
      };
    case SET_MONTH:
      return {
        ...state,
        month: action.month,
      };
    default:
      return state;
  }
};
