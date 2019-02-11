import { call, takeLatest } from 'redux-saga/effects';

import jsonFetch from 'json-fetch';

import { requestHandler, errorHandler } from '../../utils/sagaHelpers';

import { FETCH_CLIENT_STATIONS, FETCH_STATION_DATA, FETCH_IDF_DATA, FETCH_IDF_STATION_DATA } from '../constants';

import {
  fetchClientStationsSuccess,
  fetchClientStationsError,
  fetchStationDataSuccess,
  fetchStationDataError,
  fetchIdfDataSuccess,
  fetchIdfDataError,
  fetchIdfStationDataSuccess,
  fetchIdfStationDataError,
} from '../actions';

function* fetchStationData(action) {
  const errorObject = {
    action: fetchStationDataError,
    message: 'Error Fetching Client Stations Data',
  };

  try {
    const { stationId, start, end, view } = action;

    const response = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/stationData/${stationId}/?start=${start}&end=${end}&view=${view}`,
    );

    yield requestHandler(response, { action: fetchStationDataSuccess }, errorObject);
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* fetchIdfData(action) {
  const errorObject = {
    action: fetchIdfDataError,
    message: 'Error Fetching Client Stations Data',
  };

  try {
    const { stationId } = action;

    const response = yield call(jsonFetch, `${process.env.REACT_APP_API_URL}/idfData/${stationId}`);

    yield requestHandler(response, { action: fetchIdfDataSuccess }, errorObject);
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* fetchIdfStationData(action) {
  const errorObject = {
    action: fetchIdfStationDataError,
    message: 'Error Fetching Client Stations Data',
  };

  try {
    const { stationId, month } = action;

    const response = yield call(jsonFetch, `${process.env.REACT_APP_API_URL}/idfData/${stationId}/stationData?month=${month}`);

    yield requestHandler(response, { action: fetchIdfStationDataSuccess }, errorObject);
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* fetchClientStations(action) {
  const errorObject = {
    action: fetchClientStationsError,
    message: 'Error Fetching Client Stations Data',
  };

  try {
    const { clientId } = action;

    const response = yield call(jsonFetch, `${process.env.REACT_APP_API_URL}/clients/${clientId}/stations`);

    yield requestHandler(response, { action: fetchClientStationsSuccess }, errorObject);
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* defaultSaga() {
  yield takeLatest(FETCH_CLIENT_STATIONS, fetchClientStations);
  yield takeLatest(FETCH_STATION_DATA, fetchStationData);
  yield takeLatest(FETCH_IDF_DATA, fetchIdfData);
  yield takeLatest(FETCH_IDF_STATION_DATA, fetchIdfStationData);
}

export default defaultSaga;
