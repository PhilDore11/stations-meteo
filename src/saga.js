import { fork, all } from "redux-saga/effects";

import { dashboardSaga, clientsSaga } from "./containers/sagas";

export default function* rootSaga() {
  yield all([fork(dashboardSaga), fork(clientsSaga)]);
}
