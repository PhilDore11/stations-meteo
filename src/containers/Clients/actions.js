import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_ERROR,
  FETCH_REFERENCE_STATIONS,
  FETCH_REFERENCE_STATIONS_SUCCESS,
  FETCH_REFERENCE_STATIONS_ERROR,
  FETCH_LN_STATIONS,
  FETCH_LN_STATIONS_SUCCESS,
  FETCH_LN_STATIONS_ERROR,
  ADD_CLIENT,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR,
  EDIT_CLIENT,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_ERROR,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_ERROR,
  TOGGLE_CLIENT_MODAL,
  TOGGLE_USER_MODAL,
  TOGGLE_STATION_MODAL,
  TOGGLE_IMPORT_MODAL,
  SET_CLIENT_DATA,
  SET_CLIENT_ALERTS,
  SET_STATION_DATA,
  ADD_STATION,
  EDIT_STATION,
  DELETE_STATION,
  IMPORT_STATION_DATA,
  IMPORT_STATION_DATA_SUCCESS,
  IMPORT_STATION_DATA_ERROR,
} from "./constants";

export const fetchClients = () => ({
  type: FETCH_CLIENTS,
});

export const fetchClientsSuccess = (res) => ({
  type: FETCH_CLIENTS_SUCCESS,
  res,
});

export const fetchClientsError = (error) => ({
  type: FETCH_CLIENTS_ERROR,
  error,
});

export const fetchReferenceStations = () => ({
  type: FETCH_REFERENCE_STATIONS,
});

export const fetchReferenceStationsSuccess = (res) => ({
  type: FETCH_REFERENCE_STATIONS_SUCCESS,
  res,
});

export const fetchReferenceStationsError = (error) => ({
  type: FETCH_REFERENCE_STATIONS_ERROR,
  error,
});

export const fetchLnStations = () => ({
  type: FETCH_LN_STATIONS,
});

export const fetchLnStationsSuccess = (res) => ({
  type: FETCH_LN_STATIONS_SUCCESS,
  res,
});

export const fetchLnStationsError = (error) => ({
  type: FETCH_LN_STATIONS_ERROR,
  error,
});

export const addClient = (clientData) => ({
  type: ADD_CLIENT,
  clientData,
});

export const addClientSuccess = (res) => ({
  type: ADD_CLIENT_SUCCESS,
  res,
});

export const addClientError = (error) => ({
  type: ADD_CLIENT_ERROR,
  error,
});

export const editClient = (clientData) => ({
  type: EDIT_CLIENT,
  clientData,
});

export const editClientSuccess = (res) => ({
  type: EDIT_CLIENT_SUCCESS,
  res,
});

export const editClientError = (error) => ({
  type: EDIT_CLIENT_ERROR,
  error,
});

export const editUser = (clientData) => ({
  type: EDIT_USER,
  clientData,
});

export const editUserSuccess = (res) => ({
  type: EDIT_USER_SUCCESS,
  res,
});

export const editUserError = (error) => ({
  type: EDIT_USER_ERROR,
  error,
});

export const deleteClient = (clientData) => ({
  type: DELETE_CLIENT,
  clientData,
});

export const deleteClientSuccess = (res) => ({
  type: DELETE_CLIENT_SUCCESS,
  res,
});

export const deleteClientError = (error) => ({
  type: DELETE_CLIENT_ERROR,
  error,
});

export const toggleClientModal = (isAdd = false) => ({
  type: TOGGLE_CLIENT_MODAL,
  isAdd,
});

export const toggleUserModal = () => ({
  type: TOGGLE_USER_MODAL,
});

export const setClientData = (clientData) => ({
  type: SET_CLIENT_DATA,
  clientData,
});

export const setClientAlerts = (alerts) => ({
  type: SET_CLIENT_ALERTS,
  alerts,
});

export const toggleStationModal = (isAdd = false) => ({
  type: TOGGLE_STATION_MODAL,
  isAdd,
});

export const setStationData = (stationData) => ({
  type: SET_STATION_DATA,
  stationData,
});

export const addStation = (stationData) => ({
  type: ADD_STATION,
  stationData,
});

export const addStationSuccess = (res) => ({
  type: ADD_CLIENT_SUCCESS,
  res,
});

export const addStationError = (error) => ({
  type: ADD_CLIENT_ERROR,
  error,
});

export const editStation = (stationData) => ({
  type: EDIT_STATION,
  stationData,
});

export const editStationSuccess = (res) => ({
  type: EDIT_CLIENT_SUCCESS,
  res,
});

export const editStationError = (error) => ({
  type: EDIT_CLIENT_ERROR,
  error,
});

export const deleteStation = (stationData) => ({
  type: DELETE_STATION,
  stationData,
});

export const deleteStationSuccess = (res) => ({
  type: DELETE_CLIENT_SUCCESS,
  res,
});

export const deleteStationError = (error) => ({
  type: DELETE_CLIENT_ERROR,
  error,
});

export const toggleImportModal = () => ({
  type: TOGGLE_IMPORT_MODAL,
});

export const importData = (file, stationData) => ({
  type: IMPORT_STATION_DATA,
  file,
  stationData,
});

export const importDataSuccess = (res) => ({
  type: IMPORT_STATION_DATA_SUCCESS,
});

export const importDataError = () => ({
  type: IMPORT_STATION_DATA_ERROR,
});
