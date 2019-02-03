import { call, takeLatest } from 'redux-saga/effects';

import jsonFetch from 'json-fetch';

import { requestHandler, errorHandler } from '../../utils/sagaHelpers'

import {
  LOGIN,
} from './constants';

import {
  loginSuccess,
  loginError,
} from './actions';

function* loginGenerator(action) {
  const errorObject = {
    action: loginError, 
    message: 'Login Error'
  };

  try {
    const response = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/login`,
      { body: action, method: 'POST' }
    );
    yield requestHandler(response, {action: loginSuccess, message: 'Login Successful'}, errorObject);
  } catch (e) {
    yield errorHandler(errorObject);
  }
}

function* defaultSaga() {
  yield takeLatest(LOGIN, loginGenerator);
}

export default defaultSaga;
