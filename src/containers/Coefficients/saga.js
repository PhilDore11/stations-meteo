import { call, takeLatest } from "redux-saga/effects";

import jsonFetch from "json-fetch";

import { FETCH_COEFFICIENTS } from "./constants";

import { fetchCoefficientsSuccess, fetchCoefficientsError } from "./actions";

import { requestHandler, errorHandler } from "../../utils/sagaHelpers";

export const selectLoggedInUser = (state) => state.login.loggedInUser;

function* fetchCoefficientsGenerator(action) {
  const errorObject = {
    action: fetchCoefficientsError,
    message: "Error Fetching Coefficients",
  };

  const { stationId, start, end } = action;

  if (!stationId || !start || !end) {
    return yield errorHandler("Error Fetching Coefficients");
  }

  try {
    const response = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/coefficients/${stationId}?start=${start}&end=${end}`
    );

    yield requestHandler(
      response,
      { action: fetchCoefficientsSuccess },
      errorObject
    );
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* defaultSaga() {
  yield takeLatest(FETCH_COEFFICIENTS, fetchCoefficientsGenerator);
}

export default defaultSaga;
