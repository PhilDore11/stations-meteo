import {
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
  loginError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedInUser: action.res
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: action.error,
        loggedInUser: null
      };
    case LOGOUT:
      return {
        ...state,
        username: "",
        password: "",
        loginError: null,
        loggedInUser: null
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
