import {
  FETCH_STATION_DATA,
  FETCH_STATION_DATA_SUCCESS,
  FETCH_STATION_DATA_ERROR,
  INCREMENT_DAY,
  DECREMENT_DAY
} from "./constants";

export const fetchStationData = (clientId, currentDay) => ({
  type: FETCH_STATION_DATA,
  clientId,
  currentDay,
});

export const fetchStationDataSuccess = res => ({
  type: FETCH_STATION_DATA_SUCCESS,
  res
});

export const fetchStationDataError = error => ({
  type: FETCH_STATION_DATA_ERROR,
  error
});

export const incrementDay = () => ({
  type: INCREMENT_DAY
});

export const decrementDay = () => ({
  type: DECREMENT_DAY
});
