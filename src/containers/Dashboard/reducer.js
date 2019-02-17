import moment from 'moment';

import {
  LOGOUT,
  FETCH_CLIENT_STATIONS,
  FETCH_CLIENT_STATIONS_SUCCESS,
  FETCH_CLIENT_STATIONS_ERROR,
  INCREMENT,
  DECREMENT,
  SET_VIEW,
  SET_STATION,
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
  view: 'day',
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
    case SET_STATION:
      return {
        ...state,
        stationId: action.stationId,
      };
    default:
      return state;
  }
};
