import { call, put, takeLatest } from "redux-saga/effects";

import jsonFetch from "json-fetch";

import moment from "moment";

import { FETCH_STATION_DATA } from "./constants";

import {
  fetchStationDataSuccess,
  fetchStationDataError
} from "./actions";

function* fetchStationData(action) {
  try {
    const { clientId, currentDay } = action;

    const chartStart = moment(currentDay).startOf("day");
    const chartEnd = moment(currentDay).endOf("day");

    const response = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/stationData/${clientId}/?start=${chartStart.toISOString()}&end=${chartEnd.toISOString()}`
    );

    yield put(fetchStationDataSuccess(response.body));
  } catch (e) {
    yield put(fetchStationDataError(e));
  }
}

function* defaultSaga() {
  yield takeLatest(FETCH_STATION_DATA, fetchStationData);
}

export default defaultSaga;
