import {
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_ERROR,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR,
  TOGGLE_CLIENT_ADD_MODAL
} from "./constants";

const initialState = {
  clients: [],
  clientsError: null,
  addModalOpen: false
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
        addModalOpen: false
      };
    case ADD_CLIENT_ERROR:
      return {
        ...state,
        addModalOpen: false,
        clientsError: action.error
      };
    case TOGGLE_CLIENT_ADD_MODAL:
      return {
        ...state,
        addModalOpen: !state.addModalOpen
      };
    default:
      return state;
  }
};
