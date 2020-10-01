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
    message: 'Error Fetching Client Station Data',
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
    message: 'Error Fetching Client Station Data',
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
    message: 'Error Fetching Client IDF Station Data',
  };

  try {
    const { stationId, start, end } = action;

    const response = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/idfData/${stationId}/stationData?start=${start}&end=${end}`,
    );

    yield requestHandler(response, { action: fetchIdfStationDataSuccess }, errorObject);
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

export function* fetchClientStationsRequest(clientId) {
  const response = yield call(jsonFetch, `${process.env.REACT_APP_API_URL}/clients/${clientId}/stations`);

  const clientStations = [];
  for (let i = 0; i < response.body.length; i++) {
    const clientStation = response.body[i];
    const latestStationDataResponse = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/stationData/${clientStation.stationId}/latest`,
    );

    clientStations.push({ ...clientStation, ...latestStationDataResponse.body });
  }

  return clientStations;
}

function* fetchClientStations(action) {
  const errorObject = {
    action: fetchClientStationsError,
    message: 'Error Fetching Client Station Data',
  };

  try {
    const { clientId } = action;

    console.log("fetchClientStations", clientId)

    const response = yield call(fetchClientStationsRequest, clientId);

    yield requestHandler({ status: 200, body: response }, { action: fetchClientStationsSuccess }, errorObject);
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
