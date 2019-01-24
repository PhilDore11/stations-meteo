import { call, put, takeLatest } from "redux-saga/effects";

import jsonFetch from "json-fetch";

import {
  FETCH_STATIONS,
} from "./constants";

import {
  fetchStationsSuccess,
  fetchStationsError,
} from "./actions";

function* fetchStationsGenerator(action) {
  try {
    const response = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/stations/${action.clientId}`
    );

    yield put(fetchStationsSuccess(response.body));
  } catch (e) {
    yield put(fetchStationsError(e));
  }
}

function* defaultSaga() {
  yield takeLatest(FETCH_STATIONS, fetchStationsGenerator);
}

export default defaultSaga;
