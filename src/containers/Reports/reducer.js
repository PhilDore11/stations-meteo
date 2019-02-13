import moment from 'moment';

import {
  LOGOUT,
  FETCH_CLIENT_STATIONS,
  FETCH_CLIENT_STATIONS_SUCCESS,
  FETCH_CLIENT_STATIONS_ERROR,
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
  start: moment().startOf('month'),
  end: moment().endOf('month'),
  idfData: [],
  idfDataLoading: false,
  idfStationData: [],
  idfStationDataLoading: false,
  clientStations: [],
  clientStationsLoading: [],
  stationId: '',
  reportsError: false,
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
        clientStationsLoading: true,
      };
    case FETCH_CLIENT_STATIONS_SUCCESS:
      return {
        ...state,
        clientStationsLoading: false,
        clientStations: action.res,
        stationId: action.res[0].stationId,
      };
    case FETCH_CLIENT_STATIONS_ERROR:
      return {
        ...state,
        clientStationsLoading: false,
        reportsError: true,
      };
    case FETCH_IDF_DATA:
      return {
        ...state,
        idfDataLoading: true,
      };
    case FETCH_IDF_DATA_SUCCESS:
      return {
        ...state,
        idfData: action.res,
        reportsError: false,
        idfDataLoading: false,
      };
    case FETCH_IDF_DATA_ERROR:
      return {
        ...state,
        reportsError: true,
        idfDataLoading: false,
      };
    case FETCH_IDF_STATION_DATA:
      return {
        ...state,
        idfStationDataLoading: true,
      };
    case FETCH_IDF_STATION_DATA_SUCCESS:
      return {
        ...state,
        idfStationData: action.res,
        reportsError: false,
        idfStationDataLoading: false,
      };
    case FETCH_IDF_STATION_DATA_ERROR:
      return {
        ...state,
        reportsError: true,
        idfStationDataLoading: false,
      };
    case SET_YEAR:
      return {
        ...state,
        year: action.year,
        start: moment(action.year)
          .month(state.month)
          .startOf('month')
          .toISOString(),
        end: moment(action.year)
          .month(state.month)
          .endOf('month')
          .toISOString(),
      };
    case SET_MONTH:
      return {
        ...state,
        month: action.month,
        start: moment(state.year)
          .month(action.month)
          .startOf('month')
          .toISOString(),
        end: moment(state.year)
          .month(action.month)
          .endOf('month')
          .toISOString(),
      };
    default:
      return state;
  }
};
