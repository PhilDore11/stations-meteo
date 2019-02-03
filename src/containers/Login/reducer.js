import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SET_USERNAME,
  SET_PASSWORD,
} from "./constants";

const initialState = {
  loggedInUser: null,
  username: "",
  password: "",
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...initialState,
        loggedInUser: action.res
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    case SET_USERNAME:
      return {
        ...state,
        username: action.username
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.password
      };
    default:
      return state;
  }
};
