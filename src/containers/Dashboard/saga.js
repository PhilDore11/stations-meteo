import { call, put, takeLatest } from 'redux-saga/effects';

import jsonFetch from 'json-fetch';

import moment from 'moment';

import {
  FETCH_PRECIPITATION_DATA,
} from './constants';

import {
  fetchPrecipitationDataSuccess,
  fetchPrecipitationDataError,
} from './actions';

function* fetchPrecipitationData(action) {
  try {
    const { currentDay } = action;

    const chartStart = moment(currentDay).startOf('day');
    const chartEnd = moment(currentDay).endOf('day');

    const response = yield call(jsonFetch, `${process.env.REACT_APP_API_URL}/data?start=${chartStart.toISOString()}&end=${chartEnd.toISOString()}`);

    yield put(fetchPrecipitationDataSuccess(response.body));
  } catch (e) {
    yield put(fetchPrecipitationDataError(e));
  }
}

function* defaultSaga() {
  yield takeLatest(FETCH_PRECIPITATION_DATA, fetchPrecipitationData);
}

export default defaultSaga;