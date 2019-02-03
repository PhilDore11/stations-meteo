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
  try {
    const response = yield call(
      jsonFetch,
      `${process.env.REACT_APP_API_URL}/login`,
      { body: action, method: 'POST' }
    );
    yield requestHandler(response, {
      action: loginSuccess, 
      message: 'Login Successful'
    }, {
      action: loginError, 
      message: 'Login Error'
    });
  } catch (e) {
    yield errorHandler(loginError, 'Login Error', e);
  }
}

function* defaultSaga() {
  yield takeLatest(LOGIN, loginGenerator);
}

export default defaultSaga;
