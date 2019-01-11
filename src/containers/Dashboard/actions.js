import {
  FETCH_PRECIPITATION_DATA,
  FETCH_PRECIPITATION_DATA_SUCCESS,
  FETCH_PRECIPITATION_DATA_ERROR,
  INCREMENT_DAY,
  DECREMENT_DAY
} from "./constants";

export const fetchPrecipitationData = currentDay => ({
  type: FETCH_PRECIPITATION_DATA,
  currentDay
});

export const fetchPrecipitationDataSuccess = res => ({
  type: FETCH_PRECIPITATION_DATA_SUCCESS,
  res
});

export const fetchPrecipitationDataError = error => ({
  type: FETCH_PRECIPITATION_DATA_ERROR,
  error
});

export const incrementDay = () => ({
  type: INCREMENT_DAY
});

export const decrementDay = () => ({
  type: DECREMENT_DAY
});
