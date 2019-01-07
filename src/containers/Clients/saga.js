import { call, put, takeLatest } from 'redux-saga/effects';

import jsonFetch from 'json-fetch';

import {
  FETCH_CLIENTS,
} from './constants';

import {
  fetchClientsSuccess,
  fetchClientsError,
} from './actions';

function* fetchClients(action) {
  try {
    const response = yield call(jsonFetch, `${process.env.REACT_APP_API_URL}/clients`);

    yield put(fetchClientsSuccess(response.body));
  } catch (e) {
    yield put(fetchClientsError(e));
  }
}

function* defaultSaga() {
  yield takeLatest(FETCH_CLIENTS, fetchClients);
}

export default defaultSaga;