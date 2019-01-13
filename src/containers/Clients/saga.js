import { call, put, takeLatest } from "redux-saga/effects";

import jsonFetch from "json-fetch";

import { FETCH_CLIENTS, ADD_CLIENT } from "./constants";

import {
  fetchClients,
  fetchClientsSuccess,
  fetchClientsError,
  addClientSuccess,
  addClientError
} from "./actions";

function* fetchClientsGenerator() {
  try {
    const response = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/clients`
    );

    yield put(fetchClientsSuccess(response.body));
  } catch (e) {
    yield put(fetchClientsError(e));
  }
}

function* addClientGenerator(action) {
  try {
    yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/clients`,
      { body: action.clientData, method: "POST" }
    );

    yield put(addClientSuccess());
    yield put(fetchClients());
  } catch (e) {
    yield put(addClientError(e));
  }
}

function* defaultSaga() {
  yield takeLatest(FETCH_CLIENTS, fetchClientsGenerator);
  yield takeLatest(ADD_CLIENT, addClientGenerator);
}

export default defaultSaga;
