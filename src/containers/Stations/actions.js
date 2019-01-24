import {
  FETCH_STATIONS,
  FETCH_STATIONS_SUCCESS,
  FETCH_STATIONS_ERROR,
} from "./constants";

export const fetchStations = clientId => ({
  type: FETCH_STATIONS,
  clientId
});

export const fetchStationsSuccess = res => ({
  type: FETCH_STATIONS_SUCCESS,
  res
});

export const fetchStationsError = error => ({
  type: FETCH_STATIONS_ERROR,
  error
});
