import { SET_STATION, SET_YEAR, SET_MONTH } from '../constants';

export const setStation = stationId => ({
  type: SET_STATION,
  stationId,
});

export const setYear = year => ({
  type: SET_YEAR,
  year,
});

export const setMonth = month => ({
  type: SET_MONTH,
  month,
});
