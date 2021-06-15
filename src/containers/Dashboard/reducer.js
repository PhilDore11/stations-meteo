import { getMoment } from "../../utils/dateUtils";
import { FETCH_STATION_DATA_SUCCESS } from "../App/constants";

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

const initialState = {
  start: getMoment().startOf("month").toISOString(),
  end: getMoment().endOf("month").toISOString(),
  view: "month",
  stationId: "",
  error: false,
  loading: false,
  validated: false,
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
        start: getMoment(state.start)
          .add(1, state.view)
          .startOf(state.view)
          .toISOString(),
        end: getMoment(state.end)
          .add(1, state.view)
          .endOf(state.view)
          .toISOString(),
      };
    }
    case DECREMENT:
      return {
        ...state,
        start: getMoment(state.start)
          .subtract(1, state.view)
          .startOf(state.view)
          .toISOString(),
        end: getMoment(state.end)
          .subtract(1, state.view)
          .endOf(state.view)
          .toISOString(),
      };
    case SET_VIEW:
      return {
        ...state,
        view: action.view,
        start: getMoment(state.start).startOf(action.view).toISOString(),
        end: getMoment(state.start).endOf(action.view).toISOString(),
      };
    case SET_STATION:
      return {
        ...state,
        stationId: action.stationId,
      };
    case SET_START:
      return {
        ...state,
        start: getMoment(action.start).startOf("day").toISOString(),
      };
    case SET_END:
      return {
        ...state,
        end: getMoment(action.end).endOf("day").toISOString(),
      };
    case FETCH_STATION_DATA_SUCCESS:
      return { ...state, validated: action.res.validated };
    default:
      return state;
  }
};
