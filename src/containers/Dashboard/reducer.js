import moment from "moment";

import {
  FETCH_PRECIPITATION_DATA_SUCCESS,
  FETCH_PRECIPITATION_DATA_ERROR,
  INCREMENT_DAY,
  DECREMENT_DAY
} from "./constants";

const initialState = {
  currentDay: moment()
    .year(2018)
    .month(3)
    .date(19)
    .startOf("day"),
  precipitationData: [],
  precipitationError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRECIPITATION_DATA_SUCCESS:
      return {
        ...state,
        precipitationData: action.res
      };
    case FETCH_PRECIPITATION_DATA_ERROR:
      return {
        ...state,
        precipitationError: action.error
      };
    case INCREMENT_DAY:
      return {
        ...state,
        currentDay: moment(state.currentDay).add(1, "day")
      };
    case DECREMENT_DAY:
      return {
        ...state,
        currentDay: moment(state.currentDay).subtract(1, "day")
      };
    default:
      return state;
  }
};
