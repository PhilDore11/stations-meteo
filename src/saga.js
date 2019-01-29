import { fork, all } from "redux-saga/effects";

import { clientsSaga, dashboardSaga } from "./containers/sagas";

export default function* rootSaga() {
  yield all([
    fork(clientsSaga),
    fork(dashboardSaga),
  ]);
}
