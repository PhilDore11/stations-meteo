import { put } from 'redux-saga/effects';

import { success, error } from '../containers/actions';

export function* requestHandler(response, successArgs, errorArgs) {
  if (response.status === 200) {
    yield* successHandler({...successArgs, response});
  } else {
    yield* errorHandler({...errorArgs, response});
  }
}

export function* successHandler({action, message, response}) {
  if (message) yield put(success(message));
  yield put(action(response.body));
}

export function* errorHandler({action, message, response}) {
  if (message) yield put(error(`${message}: ${response.text}`));
  yield put(action());
}