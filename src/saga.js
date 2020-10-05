import { fork, all } from "redux-saga/effects";

import {
  loginSaga,
  clientsSaga,
  appSaga,
  coefficientsSaga,
} from "./containers/sagas";

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(clientsSaga),
    fork(appSaga),
    fork(coefficientsSaga),
  ]);
}
