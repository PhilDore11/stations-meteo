import moment from "moment";

import {
  LOGOUT,
  FETCH_CLIENT_STATIONS,
  FETCH_CLIENT_STATIONS_SUCCESS,
  FETCH_CLIENT_STATIONS_ERROR,
  INCREMENT,
  DECREMENT,
  SET_VIEW,
  SET_START,
  SET_END,
  SET_STATION,
} from "../constants";

const initialDay = moment();
const initialState = {
  start: moment(initialDay).startOf("month").toISOString(),
  end: moment(initialDay).endOf("month").toISOString(),
  view: "month",
  stationId: "",
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
        stationId:
          action.res && action.res.length > 0 && action.res[0].stationId,
      };
    case FETCH_CLIENT_STATIONS_ERROR:
      return {
        ...state,
        loading: false,
        dashboardError: true,
      };
    case INCREMENT: {
      return {
        ...state,
        start: moment(state.start)
          .add(1, state.view)
          .startOf(state.view)
          .toISOString(),
        end: moment(state.end)
          .add(1, state.view)
          .endOf(state.view)
          .toISOString(),
      };
    }
    case DECREMENT:
      return {
        ...state,
        start: moment(state.start)
          .subtract(1, state.view)
          .startOf(state.view)
          .toISOString(),
        end: moment(state.end)
          .subtract(1, state.view)
          .endOf(state.view)
          .toISOString(),
      };
    case SET_VIEW:
      return {
        ...state,
        view: action.view,
        start: moment(state.start).startOf(action.view).toISOString(),
        end: moment(state.start).endOf(action.view).toISOString(),
      };
    case SET_STATION:
      return {
        ...state,
        stationId: action.stationId,
      };
    case SET_START:
      return {
        ...state,
        start: moment(action.start).toISOString(),
      };
    case SET_END:
      return {
        ...state,
        end: moment(action.end).toISOString(),
      };
    default:
      return state;
  }
};
