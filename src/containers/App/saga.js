import { call, takeLatest } from 'redux-saga/effects';

import jsonFetch from 'json-fetch';

import { requestHandler, errorHandler } from '../../utils/sagaHelpers';

import { FETCH_STATION_DATA, FETCH_IDF_DATA } from '../constants';

import { fetchStationDataSuccess, fetchStationDataError, fetchIdfDataSuccess, fetchIdfDataError } from '../actions';

function* fetchStationData(action) {
  const errorObject = {
    action: fetchStationDataError,
    message: 'Error Fetching Client Stations Data',
  };

  try {
    const { clientId, start, end, view } = action;

    const response = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/stationData/${clientId}/?start=${start}&end=${end}&view=${view}`,
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
    const { clientId } = action;

    const response = yield call(jsonFetch, `${process.env.REACT_APP_API_URL}/idfData/${clientId}`);

    yield requestHandler(response, { action: fetchIdfDataSuccess }, errorObject);
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* defaultSaga() {
  yield takeLatest(FETCH_STATION_DATA, fetchStationData);
  yield takeLatest(FETCH_IDF_DATA, fetchIdfData);
}

export default defaultSaga;
