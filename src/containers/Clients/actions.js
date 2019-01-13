import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_ERROR,
  TOGGLE_CLIENT_ADD_MODAL,
  ADD_CLIENT,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR
} from "./constants";

export const fetchClients = currentDay => ({
  type: FETCH_CLIENTS
});

export const fetchClientsSuccess = res => ({
  type: FETCH_CLIENTS_SUCCESS,
  res
});

export const fetchClientsError = error => ({
  type: FETCH_CLIENTS_ERROR,
  error
});

export const toggleClientAddModal = () => ({
  type: TOGGLE_CLIENT_ADD_MODAL
});

export const addClient = clientData => ({
  type: ADD_CLIENT,
  clientData
});

export const addClientSuccess = res => ({
  type: ADD_CLIENT_SUCCESS,
  res
});

export const addClientError = error => ({
  type: ADD_CLIENT_ERROR,
  error
});
