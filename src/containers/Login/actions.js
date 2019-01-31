import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SET_USERNAME,
  SET_PASSWORD,
} from "./constants";

export const login = ({username, password}) => ({
  type: LOGIN,
  username,
  password
});

export const loginSuccess = res => ({
  type: LOGIN_SUCCESS,
  res
});

export const loginError = error => ({
  type: LOGIN_ERROR,
  error
});

export const logout = () => ({
  type: LOGOUT,
});

export const setUsername = (username) => ({
  type: SET_USERNAME,
  username,
});

export const setPassword = (password) => ({
  type: SET_PASSWORD,
  password,
});
