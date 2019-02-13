import {
  SUCCESS,
  WARNING,
  ERROR,
  RESET_ALERTS,
  FETCH_CLIENT_STATIONS,
  FETCH_CLIENT_STATIONS_SUCCESS,
  FETCH_CLIENT_STATIONS_ERROR,
  FETCH_STATION_DATA,
  FETCH_STATION_DATA_SUCCESS,
  FETCH_STATION_DATA_ERROR,
  FETCH_IDF_DATA,
  FETCH_IDF_DATA_SUCCESS,
  FETCH_IDF_DATA_ERROR,
  FETCH_IDF_STATION_DATA,
  FETCH_IDF_STATION_DATA_SUCCESS,
  FETCH_IDF_STATION_DATA_ERROR,
} from '../constants';

export const success = message => ({
  type: SUCCESS,
  message,
});

export const warning = message => ({
  type: WARNING,
  message,
});

export const error = message => ({
  type: ERROR,
  message,
});

export const resetAlerts = () => ({
  type: RESET_ALERTS,
});

export const fetchClientStations = clientId => ({
  type: FETCH_CLIENT_STATIONS,
  clientId,
});

export const fetchClientStationsSuccess = res => ({
  type: FETCH_CLIENT_STATIONS_SUCCESS,
  res,
});

export const fetchClientStationsError = error => ({
  type: FETCH_CLIENT_STATIONS_ERROR,
  error,
});

export const fetchStationData = (stationId, start, end, view = 'day') => ({
  type: FETCH_STATION_DATA,
  stationId,
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

export const fetchIdfData = stationId => ({
  type: FETCH_IDF_DATA,
  stationId,
});

export const fetchIdfDataSuccess = res => ({
  type: FETCH_IDF_DATA_SUCCESS,
  res,
});

export const fetchIdfDataError = error => ({
  type: FETCH_IDF_DATA_ERROR,
  error,
});

export const fetchIdfStationData = (stationId, start, end, view = 'day') => ({
  type: FETCH_IDF_STATION_DATA,
  stationId,
  start,
  end,
  view,
});

export const fetchIdfStationDataSuccess = res => ({
  type: FETCH_IDF_STATION_DATA_SUCCESS,
  res,
});

export const fetchIdfStationDataError = error => ({
  type: FETCH_IDF_STATION_DATA_ERROR,
  error,
});
