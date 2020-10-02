import {
  LOGOUT,
  FETCH_CLIENTS,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_ERROR,
  FETCH_REFERENCE_STATIONS_SUCCESS,
  FETCH_REFERENCE_STATIONS_ERROR,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_ERROR,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_ERROR,
  TOGGLE_CLIENT_MODAL,
  TOGGLE_USER_MODAL,
  SET_CLIENT_DATA,
  SET_CLIENT_ALERTS,
  SET_STATION_DATA,
  TOGGLE_STATION_MODAL,
  ADD_STATION_SUCCESS,
  ADD_STATION_ERROR,
  EDIT_STATION_SUCCESS,
  EDIT_STATION_ERROR,
  DELETE_STATION_SUCCESS,
  DELETE_STATION_ERROR,

} from "../constants";

const initialState = {
  clients: [],
  referenceStations: [],
  clientData: {},
  clientModalOpen: false,
  userModalOpen: false,
  isAdd: true,
  clientsLoading: true,
  clientsError: false,
  stationData: {},
  stationModalOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...initialState,
      };
    case ADD_CLIENT_SUCCESS:
    case EDIT_CLIENT_SUCCESS:
    case EDIT_USER_SUCCESS:
    case DELETE_CLIENT_SUCCESS:
    case ADD_STATION_SUCCESS:
    case EDIT_STATION_SUCCESS:
    case DELETE_STATION_SUCCESS:
      return {
        ...state,
        clientModalOpen: false,
        userModalOpen: false,
        stationModalOpen: false,
        clientsLoading: false,
        clientsError: false,
      };
    case FETCH_CLIENTS_ERROR:
    case FETCH_REFERENCE_STATIONS_ERROR:
    case ADD_CLIENT_ERROR:
    case EDIT_CLIENT_ERROR:
    case EDIT_USER_ERROR:
    case DELETE_CLIENT_ERROR:
    case ADD_STATION_ERROR:
    case EDIT_STATION_ERROR:
    case DELETE_STATION_ERROR:
      return {
        ...state,
        clientsLoading: false,
        clientsError: true,
      };
    case FETCH_CLIENTS:
      return {
        ...state,
        clientsLoading: true,
        clientsError: false,
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        clientsLoading: false,
        clients: action.res,
      };
    case FETCH_REFERENCE_STATIONS_SUCCESS:
      return {
        ...state,
        referenceStations: action.res,
      }
    case TOGGLE_CLIENT_MODAL:
      return {
        ...state,
        clientModalOpen: !state.clientModalOpen,
        isAdd: action.isAdd,
        clientsError: false,
      };
    case TOGGLE_USER_MODAL:
      return {
        ...state,
        userModalOpen: !state.userModalOpen,
        clientsError: false,
      };
    case SET_CLIENT_DATA:
      return {
        ...state,
        clientData: { ...action.clientData },
      };
    case SET_CLIENT_ALERTS:
      return {
        ...state,
        clientData: {
          ...state.clientData,
          alerts: [...action.alerts],
        },
      };
    case TOGGLE_STATION_MODAL:
      return {
        ...state,
        stationModalOpen: !state.stationModalOpen,
        isAdd: action.isAdd,
      };
    case SET_STATION_DATA:
      return {
        ...state,
        stationData: { ...action.stationData },
      };
    default:
      return state;
  }
};
