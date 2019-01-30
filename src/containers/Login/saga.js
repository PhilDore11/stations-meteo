import { call, put, takeLatest } from "redux-saga/effects";

import jsonFetch from "json-fetch";

import {
  LOGIN,
} from "./constants";

import {
  loginSuccess,
  loginError,
} from "./actions";

function* loginGenerator(action) {
  try {
    const response = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/login`,
      { body: action, method: "POST" }
    );

    yield put(loginSuccess(response.body));
  } catch (e) {
    yield put(loginError(e));
  }
}

function* defaultSaga() {
  yield takeLatest(LOGIN, loginGenerator);
}

export default defaultSaga;
