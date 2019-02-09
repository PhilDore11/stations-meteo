import {
  FETCH_STATION_DATA,
  FETCH_STATION_DATA_SUCCESS,
  FETCH_STATION_DATA_ERROR,
  INCREMENT,
  DECREMENT,
  SET_VIEW,
} from './constants';

export const fetchStationData = (clientId, start, end, view = 'day') => ({
  type: FETCH_STATION_DATA,
  clientId,
  start,
  end,
  view,
});

export const fetchStationDataSuccess = res => ({
  type: FETCH_STATION_DATA_SUCCESS,
  res,
});

export const fetchStationDataError = error => ({
  type: FETCH_STATION_DATA_ERROR,
  error,
});

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const setView = view => ({
  type: SET_VIEW,
  view,
});
