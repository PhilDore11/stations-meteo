import moment from 'moment';

import {
  LOGOUT,
  FETCH_CLIENT_STATIONS,
  FETCH_CLIENT_STATIONS_SUCCESS,
  FETCH_CLIENT_STATIONS_ERROR,
  SET_YEAR,
  SET_MONTH,
  SET_STATION,
} from '../constants';

const initialState = {
  year: moment().year(),
  month: moment().month(),
  start: moment()
    .startOf('month')
    .toISOString(),
  end: moment()
    .endOf('month')
    .toISOString(),
  clientStations: [],
  stationId: '',
  error: false,
  loading: false,
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
        loading: true,
      };
    case FETCH_CLIENT_STATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        clientStations: action.res,
        stationId: action.res[0].stationId,
      };
    case FETCH_CLIENT_STATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case SET_YEAR:
      return {
        ...state,
        year: action.year,
        start: moment()
          .year(action.year)
          .month(state.month)
          .startOf('month')
          .toISOString(),
        end: moment()
          .year(action.year)
          .month(state.month)
          .endOf('month')
          .toISOString(),
      };
    case SET_MONTH:
      return {
        ...state,
        month: action.month,
        start: moment()
          .year(state.year)
          .month(action.month)
          .startOf('month')
          .toISOString(),
        end: moment()
          .year(state.year)
          .month(action.month)
          .endOf('month')
          .toISOString(),
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
