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
  loginLoading: false,
  loginError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loginLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedInUser: action.res
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginLoading: false,
        loginError: true,
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
