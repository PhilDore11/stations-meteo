import { INCREMENT, DECREMENT, SET_STATION, SET_VIEW } from '../constants';

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const setStation = stationId => ({
  type: SET_STATION,
  stationId,
});

export const setView = view => ({
  type: SET_VIEW,
  view,
});
