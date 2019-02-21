import { INCREMENT, DECREMENT, SET_START, SET_END, SET_STATION, SET_VIEW } from '../constants';

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const setStart = start => ({
  type: SET_START,
  start,
});

export const setEnd = end => ({
  type: SET_END,
  end,
});

export const setStation = stationId => ({
  type: SET_STATION,
  stationId,
});

export const setView = view => ({
  type: SET_VIEW,
  view,
});
