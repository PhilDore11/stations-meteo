import { call, put, takeLatest, select } from 'redux-saga/effects';

import jsonFetch from 'json-fetch';

import { FETCH_CLIENTS, ADD_CLIENT, EDIT_CLIENT, DELETE_CLIENT } from './constants';

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
} from './actions';

import { requestHandler, errorHandler } from '../../utils/sagaHelpers';
import { fetchClientStationsRequest } from '../App/saga';

export const selectLoggedInUser = state => state.login.loggedInUser;

function* fetchClientsGenerator() {
  const errorObject = {
    action: fetchClientsError,
    message: 'Error Fetching Clients',
  };

  try {
    const loggedInUser = yield select(selectLoggedInUser);
    const clientIds = loggedInUser && loggedInUser.clients.map(client => `id=${client.id}`);
    const response = yield call(jsonFetch, `${process.env.REACT_APP_API_URL}/clients?${clientIds.join('&')}`);

    const clients = [];
    for (let i = 0; i < response.body.length; i++) {
      const client = response.body[i];

      const clientStationsResponse = yield call(fetchClientStationsRequest, client.id);

      clients.push({ ...client, stations: clientStationsResponse });
    }

    yield requestHandler({ status: 200, body: clients }, { action: fetchClientsSuccess }, errorObject);
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* addClientGenerator(action) {
  const errorObject = {
    action: addClientError,
    message: 'Error Adding Client',
  };

  try {
    const response = yield call(jsonFetch, `${process.env.REACT_APP_API_URL}/clients`, {
      body: action.clientData,
      method: 'POST',
    });
    yield requestHandler(response, { action: addClientSuccess }, errorObject);
    yield put(fetchClients());
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* editClientGenerator(action) {
  const errorObject = {
    action: editClientError,
    message: 'Error Editing Client',
  };

  try {
    const { id, ...rest } = action.clientData;
    const response = yield call(jsonFetch, `${process.env.REACT_APP_API_URL}/clients/${id}`, {
      body: rest,
      method: 'PUT',
    });

    yield requestHandler(response, { action: editClientSuccess }, errorObject);
    yield put(fetchClients());
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* deleteClientGenerator(action) {
  const errorObject = {
    action: deleteClientError,
    message: 'Error Editing Client',
  };

  try {
    const { id } = action.clientData;
    const response = yield call(jsonFetch, `${process.env.REACT_APP_API_URL}/clients/${id}`, { method: 'DELETE' });

    yield requestHandler(response, { action: deleteClientSuccess }, errorObject);
    yield put(fetchClients());
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* defaultSaga() {
  yield takeLatest(FETCH_CLIENTS, fetchClientsGenerator);
  yield takeLatest(ADD_CLIENT, addClientGenerator);
  yield takeLatest(EDIT_CLIENT, editClientGenerator);
  yield takeLatest(DELETE_CLIENT, deleteClientGenerator);
}

export default defaultSaga;
