import { call, takeLatest } from "redux-saga/effects";

import moment from "moment";
import jsonFetch from "json-fetch";

import { requestHandler, errorHandler } from "../../utils/sagaHelpers";

import {
  FETCH_CLIENT_STATIONS,
  FETCH_STATION_DATA,
  FETCH_IDF_DATA,
  FETCH_IDF_STATION_DATA,
  EXPORT_STATION_DATA,
} from "../constants";

import {
  fetchClientStationsSuccess,
  fetchClientStationsError,
  fetchStationDataSuccess,
  fetchStationDataError,
  fetchIdfDataSuccess,
  fetchIdfDataError,
  fetchIdfStationDataSuccess,
  fetchIdfStationDataError,
  exportStationDataError,
} from "../actions";

function* fetchStationData(action) {
  const errorObject = {
    action: fetchStationDataError,
    message: "Error Fetching Client Station Data",
  };

  try {
    const { stationId, start, end, view } = action;

    const startMoment = moment(start).startOf("day");
    const endMoment = moment(end).endOf("day");
    const dateDiff = endMoment.diff(startMoment, "month", true);

    if (dateDiff >= 1) {
      return yield requestHandler(
        { status: 200, body: [] },
        { action: fetchStationDataSuccess },
        errorObject
      );
    }

    const response = yield call(
      jsonFetch,
      `${
        process.env.REACT_APP_API_URL
      }/stationData/${stationId}/?start=${startMoment.toISOString()}&end=${endMoment.toISOString()}&view=${view}`
    );

    yield requestHandler(
      response,
      { action: fetchStationDataSuccess },
      errorObject
    );
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* fetchIdfData(action) {
  const errorObject = {
    action: fetchIdfDataError,
    message: "Error Fetching Client Station Data",
  };

  try {
    const { stationId } = action;

    const response = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/idfData/${stationId}`
    );

    yield requestHandler(
      response,
      { action: fetchIdfDataSuccess },
      errorObject
    );
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* fetchIdfStationData(action) {
  const errorObject = {
    action: fetchIdfStationDataError,
    message: "Error Fetching Client IDF Station Data",
  };

  try {
    const { stationId, start, end } = action;

    const startMoment = moment(start).startOf("day");
    const endMoment = moment(end).endOf("day");

    const response = yield call(
      jsonFetch,
      `${
        process.env.REACT_APP_API_URL
      }/idfData/${stationId}/stationData?start=${startMoment.toISOString()}&end=${endMoment.toISOString()}`
    );

    yield requestHandler(
      response,
      { action: fetchIdfStationDataSuccess },
      errorObject
    );
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

export function* fetchClientStationsRequest(clientId) {
  const response = yield call(
    jsonFetch,
    `${process.env.REACT_APP_API_URL}/clients/${clientId}/stations`
  );

  const clientStations = [];
  for (let i = 0; i < response.body.length; i++) {
    const clientStation = response.body[i];
    const latestStationDataResponse = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/stationData/${clientStation.stationId}/latest`
    );

    clientStations.push({
      ...clientStation,
      hasRain: clientStation.hasRain === 1,
      hasSnow: clientStation.hasSnow === 1,
      hasWind: clientStation.hasWind === 1,
      hasHydro: clientStation.hasHydro === 1,
      ...latestStationDataResponse.body,
    });
  }

  return clientStations;
}

function* fetchClientStations(action) {
  const errorObject = {
    action: fetchClientStationsError,
    message: "Error Fetching Client Station Data",
  };

  try {
    const { clientId } = action;

    const response = yield call(fetchClientStationsRequest, clientId);

    yield requestHandler(
      { status: 200, body: response },
      { action: fetchClientStationsSuccess },
      errorObject
    );
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* exportStationData(action) {
  const errorObject = {
    action: exportStationDataError,
    message: "Error Exporting Station Data",
  };

  try {
    const { stationId, start, end } = action;

    const startMoment = moment(start).startOf("day");
    const endMoment = moment(end).endOf("day");

    window.location.href = `${
      process.env.REACT_APP_API_URL
    }/stationData/${stationId}/export?start=${startMoment.toISOString()}&end=${endMoment.toISOString()}`;
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* defaultSaga() {
  yield takeLatest(FETCH_CLIENT_STATIONS, fetchClientStations);
  yield takeLatest(FETCH_STATION_DATA, fetchStationData);
  yield takeLatest(FETCH_IDF_DATA, fetchIdfData);
  yield takeLatest(FETCH_IDF_STATION_DATA, fetchIdfStationData);
  yield takeLatest(EXPORT_STATION_DATA, exportStationData);
}

export default defaultSaga;
