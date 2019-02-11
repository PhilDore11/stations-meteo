import moment from 'moment';

import {
  LOGOUT,
  FETCH_CLIENT_STATIONS,
  FETCH_CLIENT_STATIONS_SUCCESS,
  FETCH_CLIENT_STATIONS_ERROR,
  FETCH_STATION_DATA,
  FETCH_STATION_DATA_SUCCESS,
  FETCH_STATION_DATA_ERROR,
  INCREMENT,
  DECREMENT,
  SET_VIEW,
} from '../constants';

const initialDay = moment()
  .year(2018)
  .month(3)
  .date(19);
const initialState = {
  start: moment(initialDay)
    .startOf('day')
    .toISOString(),
  end: moment(initialDay)
    .endOf('day')
    .toISOString(),
  stationData: [],
  view: 'day',
  clientStations: [],
  stationId: '',
  dashboardError: false,
  dashboardLoading: false,
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
        dashboardLoading: true,
      };
    case FETCH_CLIENT_STATIONS_SUCCESS:
      return {
        ...state,
        dashboardLoading: false,
        clientStations: action.res,
        stationId: action.res[0].stationId,
      };
    case FETCH_CLIENT_STATIONS_ERROR:
      return {
        ...state,
        dashboardLoading: false,
        dashboardError: true,
      };
    case FETCH_STATION_DATA:
      return {
        ...state,
        dashboardLoading: true,
      };
    case FETCH_STATION_DATA_SUCCESS:
      return {
        ...state,
        stationData: action.res,
        dashboardError: false,
        dashboardLoading: false,
      };
    case FETCH_STATION_DATA_ERROR:
      return {
        ...state,
        dashboardError: true,
        dashboardLoading: false,
      };
    case INCREMENT:
      return {
        ...state,
        start: moment(state.start)
          .add(1, state.view)
          .toISOString(),
        end: moment(state.end)
          .add(1, state.view)
          .toISOString(),
      };
    case DECREMENT:
      return {
        ...state,
        start: moment(state.start)
          .subtract(1, state.view)
          .toISOString(),
        end: moment(state.end)
          .subtract(1, state.view)
          .toISOString(),
      };
    case SET_VIEW:
      return {
        ...state,
        view: action.view,
        start: moment(state.start)
          .startOf(action.view)
          .toISOString(),
        end: moment(state.start)
          .endOf(action.view)
          .toISOString(),
      };
    default:
      return state;
  }
};
