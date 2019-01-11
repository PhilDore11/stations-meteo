import { FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_ERROR } from "./constants";

const initialState = {
  clients: [],
  clientsError: null
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
    default:
      return state;
  }
};
