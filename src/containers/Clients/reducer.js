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
} from './constants';

const initialState = {
  clients: [],
  clientData: {},
  clientModalOpen: false,
  isAdd: true,
  clientsError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLIENT_SUCCESS:
    case EDIT_CLIENT_SUCCESS:
    case DELETE_CLIENT_SUCCESS:
      return {
        ...initialState,
        clientsError: false
      };
    case FETCH_CLIENTS_ERROR:
    case ADD_CLIENT_ERROR:
    case EDIT_CLIENT_ERROR:
    case DELETE_CLIENT_ERROR:
      return {
        ...state,
        clientsError: true
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.res
      };
    case TOGGLE_CLIENT_MODAL:
      return {
        ...state,
        clientModalOpen: !state.clientModalOpen,
        isAdd: action.isAdd,
        clientsError: false
      };
    case SET_CLIENT_DATA:
      return {
        ...state,
        clientData: {...action.clientData}
      };
    default:
      return state;
  }
};
