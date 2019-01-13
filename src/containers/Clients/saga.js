import { call, put, takeLatest } from "redux-saga/effects";

import jsonFetch from "json-fetch";

import { FETCH_CLIENTS, ADD_CLIENT } from "./constants";

import {
  fetchClientsSuccess,
  fetchClientsError,
  addClientSuccess,
  addClientError
} from "./actions";

function* fetchClients() {
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

function* addClient(action) {
  console.log("action", action);
  try {
    const response = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/clients`,
      { body: action.clientData, method: "POST" }
    );

    yield put(addClientSuccess(response.body));
  } catch (e) {
    yield put(addClientError(e));
  }
}

function* defaultSaga() {
  yield takeLatest(FETCH_CLIENTS, fetchClients);
  yield takeLatest(ADD_CLIENT, addClient);
}

export default defaultSaga;
