import { call, put, takeLatest } from "redux-saga/effects";

import jsonFetch from "json-fetch";

import {
  FETCH_CLIENTS,
  ADD_CLIENT,
  EDIT_CLIENT,
  DELETE_CLIENT,
} from "./constants";

import {
  fetchClients,
  fetchClientsSuccess,
  fetchClientsError,
  addClientSuccess,
  addClientError,
  editClientSuccess,
  editClientError,
  deleteClientSuccess,
  deleteClientError,
} from "./actions";

function* fetchClientsGenerator(action) {
  try {
    const {loggedInUser} = action;
    if (loggedInUser) {
      const clientIds = loggedInUser.clients.map((client) => `id=${client.id}`);
      const response = yield call(
        jsonFetch,
        `${process.env.REACT_APP_API_URL}/clients?${clientIds.join('&')}`,
        {clients: loggedInUser.clients}
      );

      yield put(fetchClientsSuccess(response.body));
    } else {
      yield put(fetchClientsSuccess([]));
    }
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

function* editClientGenerator(action) {
  try {
    yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/clients`,
      { body: action.clientData, method: "PUT" }
    );

    yield put(editClientSuccess());
    yield put(fetchClients());
  } catch (e) {
    yield put(editClientError(e));
  }
}

function* deleteClientGenerator(action) {
  try {
    yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/clients`,
      { body: action.clientData, method: "DELETE" }
    );

    yield put(deleteClientSuccess());
    yield put(fetchClients());
  } catch (e) {
    yield put(deleteClientError(e));
  }
}

function* defaultSaga() {
  yield takeLatest(FETCH_CLIENTS, fetchClientsGenerator);
  yield takeLatest(ADD_CLIENT, addClientGenerator);
  yield takeLatest(EDIT_CLIENT, editClientGenerator);
  yield takeLatest(DELETE_CLIENT, deleteClientGenerator);
}

export default defaultSaga;
