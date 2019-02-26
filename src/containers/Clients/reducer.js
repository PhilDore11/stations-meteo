import {
  LOGOUT,
  FETCH_CLIENTS,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_ERROR,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_ERROR,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_ERROR,
  TOGGLE_CLIENT_MODAL,
  TOGGLE_USER_MODAL,
  SET_CLIENT_DATA,
  SET_CLIENT_ALERTS,
} from '../constants';

const initialState = {
  clients: [],
  clientData: {},
  clientModalOpen: false,
  userModalOpen: false,
  isAdd: true,
  clientsLoading: true,
  clientsError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...initialState,
      };
    case ADD_CLIENT_SUCCESS:
    case EDIT_CLIENT_SUCCESS:
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clientModalOpen: false,
        userModalOpen: false,
        clientsLoading: false,
        clientsError: false,
      };
    case FETCH_CLIENTS_ERROR:
    case ADD_CLIENT_ERROR:
    case EDIT_CLIENT_ERROR:
    case DELETE_CLIENT_ERROR:
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
    default:
      return state;
  }
};
