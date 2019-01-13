import {
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_ERROR,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_ERROR,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_ERROR,
  TOGGLE_CLIENT_MODAL,
  SET_CLIENT_DATA,
} from "./constants";

const initialState = {
  clients: [],
  clientsError: null,
  clientData: {},
  clientModalOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.res
      };
    case FETCH_CLIENTS_ERROR:
      return {
        ...state,
        clientsError: action.error
      };
    case ADD_CLIENT_SUCCESS:
      return {
        ...state,
        clientModalOpen: false,
        clientsError: null
      };
    case ADD_CLIENT_ERROR:
      return {
        ...state,
        clientModalOpen: false,
        clientsError: action.error
      };
    case EDIT_CLIENT_SUCCESS:
      return {
        ...state,
        clientModalOpen: false,
        clientsError: null
      };
    case EDIT_CLIENT_ERROR:
      return {
        ...state,
        clientModalOpen: false,
        clientsError: action.error
      };
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clientsError: null
      };
    case DELETE_CLIENT_ERROR:
      return {
        ...state,
        clientsError: action.error
      };
    case TOGGLE_CLIENT_MODAL:
      return {
        ...state,
        clientModalOpen: !state.clientModalOpen
      };
    case SET_CLIENT_DATA:
      return {
        ...state,
        clientData: action.clientData
      };
    default:
      return state;
  }
};
